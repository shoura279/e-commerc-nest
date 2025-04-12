import { Injectable } from '@nestjs/common';
import cloudinary from '../Config/cloud.config';

interface IUploadFile {
  path: string;
  folder?: string;
  public_id?: string;
}
@Injectable()
export class CloudService {
  uploadFile({ path, folder, public_id }: IUploadFile) {
    return cloudinary.uploader.upload(path, { folder, public_id });
  }

  deleteFile(public_id: string) {
    cloudinary.uploader.destroy(public_id);
  }

  async deleteResource(path: string) {
    await cloudinary.api.delete_resources_by_prefix(path);
  }

  async deleteFolder(path: string) {
    await this.deleteResource(path);
    await cloudinary.api.delete_folder(path);
  }
}
