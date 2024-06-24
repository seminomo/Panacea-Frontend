'use client';
import { useState, useEffect } from 'react';
import { Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import Image from 'next/image';

interface UploadComponentProps {
  onFileListChange: (fileList: UploadFile[]) => void;
  onLoadingChange: (loading: boolean) => void;
  defaultFileList: UploadFile[];
  action: string;
  maxCount?: number;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  defaultFileList,
  onFileListChange,
  onLoadingChange,
  action,
  maxCount = 1,
}) => {
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

  useEffect(() => {
    setFileList(defaultFileList);
  }, [defaultFileList]);

  const handleUploadChange = async ({ file, fileList }: any) => {
    setLoading(true);
    if (file.status === 'uploading') {
      onLoadingChange(true);
    } else if (file.status === 'done') {
      // 取得 api 回傳的 imageUrl
      const imageUrl = await file.response.data.imageUrl;
      setImageUrl(imageUrl);
      onLoadingChange(false);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
      onLoadingChange(false);
    } else if (file.status === 'removed') {
      onLoadingChange(false);
    }
    setFileList(fileList);
    onFileListChange(fileList); // 更新父元件的 fileList
    setLoading(false);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = imageUrl;
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  return (
    <>
      <Upload
        listType="picture-card"
        beforeUpload={beforeUpload}
        onChange={handleUploadChange}
        action={action}
        fileList={fileList}
        onPreview={handlePreview}
        maxCount={maxCount}
      >
        {uploadButton}
      </Upload>
      <Modal open={previewVisible} title="Preview Image" footer={null} onCancel={() => setPreviewVisible(false)}>
        <Image alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadComponent;
