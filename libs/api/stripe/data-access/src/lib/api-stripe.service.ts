import { PriceSubscription } from './models/subscription.model';
import  Stripe from 'stripe'
import { ApiCoreDataAccessService } from '@case-clinical/api/core/data-access';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { BillingInfo } from './models/billing-info.model';
import { PriceListInput } from './dto/price-list-input';
import { User } from '@case-clinical/api/user/data-access'
import { UserCreateBillingInfoInput } from './dto/user-create-billing-info';
import { UserUpdateBillingInfoInput } from './dto/user-update-billing-info-input';
import StripeError from './stripe.error.enum'
import { SubscriptionListInput } from './dto/subscription-list-input';

@Injectable()
export class ApiStripeService {
  private stripe: Stripe;

  constructor(private data: ApiCoreDataAccessService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15'
    })
  }

  mapStripePaymentMethodToBillingInfo(paymentMethod: Stripe.PaymentMethod): BillingInfo {
    if(!paymentMethod) return null;

    return {
      id: paymentMethod.id,
      cardHolder: paymentMethod.billing_details.name,
      last4: paymentMethod.card.last4,
      expireYear: paymentMethod.card.exp_year - 2000,
      expireMonth: paymentMethod.card.exp_month,
      country: paymentMethod.billing_details.address.country,
      zip: paymentMethod.billing_details.address.postal_code
    }
  }

  async getDefaultPaymentMethodId(customerId: string): Promise<string> {
    const customer: any = (await this.stripe.customers.retrieve(
      customerId
    ))
    console.log('customer = ', customer)
    if(!customer) return null;

    const defaultPaymentMethodId = customer.invoice_settings.default_payment_method;
    return defaultPaymentMethodId;
  }

  async getDefaultPaymentMethod(customerId: string): Promise<Stripe.PaymentMethod> {
    const defaultPaymentMethodId = await this.getDefaultPaymentMethodId(customerId);
    console.log('defaultPaymentMethodId', defaultPaymentMethodId)
    if(!defaultPaymentMethodId) return null;
    return await this.stripe.customers.retrievePaymentMethod(
      customerId,
      defaultPaymentMethodId
    )
  }

  async userBillingInfo(user: User): Promise<BillingInfo> {
    console.log('userBillingInfo');
    console.log(user.customerId)
    if(!user.customerId) {
      const customer = await this.stripe.customers.create({
        name: user.username,
        email: user.emails.length > 0 ? user.emails[0].email : ""
      });
      user = await this.data.user.update({
        where: {
          id: user.id
        },
        data: {
          customerId: customer.id
        }
      })
    }

    return this.mapStripePaymentMethodToBillingInfo(
      await this.getDefaultPaymentMethod(user.customerId)
    )
  }

  async userCreateBillingInfo(user: User, input: UserCreateBillingInfoInput) {
    console.log('userCreateBillingInfo, input = ', input);
    const defaultPaymentMethodId = await this.getDefaultPaymentMethodId(user.customerId);
    if(defaultPaymentMethodId) {
      throw new BadRequestException({
        error: "Duplicated payment method creation"
      }, "Default payment method already exists for this customer")
    }
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: input.cardNumber,
        exp_month: input.expireMonth,
        exp_year: 2000 + input.expireYear,
        cvc: input.cvc,
      },
      billing_details: {
        address: {
          postal_code: input.zip,
          country: input.country
        },
        name: input.cardHolder,
        email: user.emails.length > 0 ? user.emails[0].email : ""
      }
    })
    await this.stripe.paymentMethods.attach(
      paymentMethod.id,
      {
        customer: user.customerId
      }
    )
    await this.stripe.customers.update(user.customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod.id
      }
    })
    return this.mapStripePaymentMethodToBillingInfo(paymentMethod);
  }

  async userUpdateBillingInfo(user: User, input: UserUpdateBillingInfoInput) {
     const paymentMethodId = await this.getDefaultPaymentMethodId(user.customerId);
     if(!paymentMethodId) {
      throw new BadRequestException({ error: "Bad paymentmethod update request" }, "You don't have default payment method to update")
     }

     const paymentMethod = await this.stripe.paymentMethods.update(paymentMethodId, {
        card: {
          exp_month: input.expireMonth,
          exp_year: 2000 + input.expireYear,
        },
        billing_details: {
          name: input.cardHolder,
          address: {
            postal_code: input.zip,
            country: input.country
          },
        }
     })
     return this.mapStripePaymentMethodToBillingInfo(paymentMethod)
  }

  public async cancelSubscription(userId: string, subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.cancel(
        subscriptionId
      );
      console.log(subscription.status)
      if(subscription.status === 'canceled') {
        const priceId = subscription.items.data[0].price.id;
        const feature = await this.data.feature.findFirst({ where: { priceId: priceId } })
        if(feature) {
          const userFeature = await this.data.userFeature.findFirst({ where: {
            userId: userId,
            featureId: feature.id
          } })
          await this.data.userFeature.delete({
            where: {
                id: userFeature.id
            }
          })
        }
        return subscription;
      }
      throw new InternalServerErrorException();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async createSubscription(priceId: string, customerId: string, userId: string) {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId
          }
        ]
      })
      if(subscription.status === 'active') {
        const feature = await this.data.feature.findFirst({
          where: { priceId: priceId }
        })
        await this.data.userFeature.create({
          data: {
            id: `${userId}.${feature.id}`,
            name: `${userId}.${feature.id}`,
            featureId: feature.id,
            userId: userId
          }
        })
      }
      return subscription;
    } catch (error) {
      if (error?.code === StripeError.ResourceMissing) {
        throw new BadRequestException('Credit card not set up');
      }
      throw new InternalServerErrorException();
    }
  }

  public async listPrices(input: PriceListInput) {
    const products = await this.stripe.products.list({
      expand: ['data.default_price']
    })
    const prices = products.data.map((product) => {
      console.log(product.default_price);
      const price: Stripe.Price = product.default_price as Stripe.Price;

      return {
        id: price.id,
        name: product.name,
        image: product.images[0],
        description: product.description,
        price: price.unit_amount,
        currency: price.currency,
        interval: price.recurring.interval
      };
    })
    return prices;
  }

  public async listSubscriptions(customerId: string, input: SubscriptionListInput) {
    const condition = {
      customer: customerId,
    }
    input.status && (condition['status'] = input.status)

    const subscriptions = await this.stripe.subscriptions.list({
      ...condition
    })
    const priceSubscriptions: PriceSubscription[] = subscriptions.data.map((subscription) => {
      return {
        id: subscription.id,
        priceId: subscription.items.data[0].price.id,
        status: subscription.status
      }
    })
    return priceSubscriptions;
  }

  // public async checkOut(customer: string): Promise<CheckoutSession> {

  //   const prices = await this.stripe.prices.list();
  //   if(prices.data.length === 0) {
  //     throw new InternalServerErrorException();
  //   }
  //   const session = await this.stripe.checkout.sessions.create({
  //     billing_address_collection: 'auto',
  //     customer: customer,
  //     line_items: [
  //       {
  //         price: prices.data[0].id,
  //         // For metered billing, do not pass quantity
  //         quantity: 1,

  //       },
  //     ],
  //     mode: 'subscription',
  //     success_url: 'http://localhost:3000/success',
  //     cancel_url: 'http://localhost:3000/success'
  //   })
  //   return {
  //     id: session.id,
  //     currency: session.currency,
  //     amount_total: session.amount_total,
  //     amount_subtotal: session.amount_subtotal,
  //     url: session.url,
  //     success_url: session.success_url,
  //     cancel_url: session.cancel_url,
  //     created: new Date(session.created * 1000),
  //     payment_status: session.payment_status,
  //     expires_at: new Date(session.expires_at * 1000)
  //   };
  // }
}

