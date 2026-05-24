import { S3Client, type S3ClientConfig } from "@aws-sdk/client-s3";
import { memoize } from "lodash-es";

import config from "@/config";

export type { S3Client } from "@aws-sdk/client-s3";

function getS3ClientBase(region: string = config.get("s3.region")) {
  const endpoint = config.get("s3.endpoint");
  const forcePathStyle = config.get("s3.forcePathStyle");
  const accessKeyId = config.get("s3.accessKeyId");
  const secretAccessKey = config.get("s3.secretAccessKey");

  const options: S3ClientConfig = { region };
  if (endpoint) {
    options.endpoint = endpoint;
  }
  if (forcePathStyle) {
    options.forcePathStyle = true;
  }
  if (accessKeyId && secretAccessKey) {
    options.credentials = { accessKeyId, secretAccessKey };
  }

  return new S3Client(options);
}

/**
 * Get the S3 client instance.
 */
export const getS3Client: typeof getS3ClientBase = memoize(getS3ClientBase);
