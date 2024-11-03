import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MediumPost } from '../types/medium';

interface FileUploadProps {
  onFileLoad: (posts: MediumPost[]) => void;
}

export function FileUpload({ onFileLoad }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        onFileLoad(json);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file);
  }, [onFileLoad]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the JSON file here...</p>
      ) : (
        <p>Drag and drop a JSON file here, or click to select one</p>
      )}
    </div>
  );
}