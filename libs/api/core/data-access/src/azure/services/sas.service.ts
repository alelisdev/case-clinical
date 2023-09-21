import { Injectable } from '@nestjs/common'
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access';

@Injectable()
export class ApiAzureDataAccessUserService {
  async sas(userId: string) {
     const storageUri = process.env.AZURE_STORAGE_URL || "";

     const storageAccessToken = this.generateSasToken(storageUri, "", "", "lrwdtf")
    
    const result = { storageUri, storageAccessToken}
    return result
  }
  
  async fileSas(userId: string, document: UserUpdateDocumentInput) {
    const account = process.env.AZURE_STORAGE_ACCOUNT || "";
    const accountKey = process.env.AZURE_STORAGE_KEY || "";
    const storageUri = process.env.AZURE_STORAGE_URL || "";

    
    let filePath = storageUri + "/" + document?.parentId + "/" + document.id + ".temp";

    if(document != null && document.parentId) {
      filePath += "/" + document?.parentId + "/" + document.id + ".temp";
    } else {
      filePath += "/" + document.id + ".temp";
    }
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

    const storageAccessToken = this.generateSasToken(filePath, sharedKeyCredential, "", 10)
    const result = { storageUri, storageAccessToken}
    return result
  }
  

  generateSasToken(context, container, blobName, permissions) {
    const connString = process.env.AZURE_STORAGE_CONNECTIONSTRING;
    const blobService = BlobServiceClient.fromConnectionString(connString)
    const containerName = process.env.AZURE_CONTAINER_NAME || 'base_project_files'
    // Set start time to five minutes ago to avoid clock skew.
    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 10);

    permissions = permissions || "r";

    const resourceTypes = "sco"
    
    const sasToken = blobService.generateAccountSasUrl(expiryDate, permissions, resourceTypes);
    
    return sasToken
}

// generateSasToken (resourceUri, signingKey, policyName, expiresInMins) {
//     resourceUri = encodeURIComponent(resourceUri+'/'+ signingKey.accountName);

//     // Set expiration in seconds
//     var expires = (Date.now() / 1000) + expiresInMins * 60;
//     expires = Math.ceil(expires);
//     var toSign = resourceUri + '\n' + expires;

//     // Use crypto
//     var hmac = crypto.createHmac('sha256', Buffer.from(signingKey.accountKey, 'base64'));
//     hmac.update(toSign);
//     var base64UriEncoded = encodeURIComponent(hmac.digest('base64'));

//     // Construct autorization string
//     var token = "SharedAccessSignature sr=" + resourceUri + "&sig="
//     + base64UriEncoded + "&se=" + expires;
//     if (policyName) token += "&skn="+policyName;
//     return token
//   }
// 
}
