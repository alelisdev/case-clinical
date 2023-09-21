import { ApiMessage } from './api-message';

export class ApiResponse<T> {
  /** A boolean indicator of success for the response. */
  isSuccess = false;

  /**
   * A message from the application API. Should not be used for general user notifications.
   */
  message = '';

  /**
   * A list of [ApiMessage] items.
   */
  messages = new Array<ApiMessage>();

  /**
   * Use to retrieve the data/payload for the specified request. The
   * API will provide for requests marked as [IsSuccessful=true].
   */
  data?: T; // only on success;

  /**
   * Use to provide the CorrelationId for the specified response.
   */
  id!: string;

  /**
   * Use to provide the timestamp the response was processed by the API.
   */
  timestamp = new Date();
}
