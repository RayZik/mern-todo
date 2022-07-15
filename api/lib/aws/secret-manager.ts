import { SecretsManager } from '@aws-sdk/client-secrets-manager';

export namespace AwsSecretManager {
  export const client = new SecretsManager({
    region: 'us-east-1'
  });

  export const attachToProcessEnv = async (secretId: string) => {
    let data = {};

    try {
      const result = await client.getSecretValue({
        SecretId: secretId
      });

      data = JSON.parse(result.SecretString || '{}');


    } catch (error) {
      if (process.env.NODE_ENV === 'local') {
        console.warn('attachToProcessEnv:: Use local process.env');

        data = {
          DB_USER: 'local',
          DB_PASSWORD: 'local'
        }
      } else {
        console.error('attachToProcessEnv:: Error', error);

        throw error;
      }
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        process.env[key] = data[key];
      }
    }
  };
}
