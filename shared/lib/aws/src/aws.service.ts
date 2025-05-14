import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private s3: S3Client;
  private awsConfig: any;

  constructor(private readonly configService: ConfigService) {
    this.awsConfig = this.configService.get('aws');
    this.s3 = new S3Client({
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
    });
  }

  async createPhoto(file) {
    try {

      const name = this.generateArticle();
      if (!file || !file.buffer) {
        throw new Error('Invalid file: buffer is missing.');
      }
      console.log(this.awsConfig.bucketName)

      const params = {
        Bucket: this.awsConfig.bucketName,
        Key: name,
        Body: Buffer.from(file.buffer.data),
        ContentType: file.mimetype,
      };
      console.log(params)
      await this.s3.send(new PutObjectCommand(params));

      const fileUrl = `https://${this.awsConfig.bucketName}.s3.${this.awsConfig.region}.amazonaws.com/${name}`;
      console.log(fileUrl)
      return fileUrl;
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Error('Error uploading file to S3.');
    }
  }

  async remove_photo(url: string) {
    const parts = url.split('/');
    const name = parts[parts.length - 1];

    const params = {
      Bucket: this.awsConfig.bucketName,
      Key: name,
    };

    return this.s3.send(new DeleteObjectCommand(params));
  }

  private generateArticle() {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    let article = timestamp.slice(-8) + randomPart;

    while (article.length < 12) {
      article = '0' + article;
    }
    console.log(article);
    return article;
  }
}
