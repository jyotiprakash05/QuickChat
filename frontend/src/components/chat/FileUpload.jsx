import { useState } from 'react';
import { X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function FileUpload({ onUploadComplete, onCancel }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    
    if (selected.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      // Get presigned URL
      const response = await fetch(`${apiUrl}/upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type })
      });
      
      const { uploadUrl, fileUrl } = await response.json();
      
      // Upload to S3
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });
      
      onUploadComplete({ url: fileUrl, name: file.name, type: file.type, size: file.size });
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-surface border border-white/10 rounded-xl shadow-xl">
      <div className="flex items-start gap-3">
        {preview ? (
          <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
        ) : (
          <div className="w-20 h-20 bg-navy-700 rounded-lg flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white truncate">{file?.name || 'Select a file'}</p>
          <p className="text-xs text-gray-500 mt-1">
            {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Max 10MB'}
          </p>
          
          {!file && (
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="mt-2 text-xs text-gray-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg 
                         file:border-0 file:bg-electric file:text-white file:cursor-pointer"
            />
          )}
        </div>
        
        <button onClick={onCancel} className="text-gray-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {file && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1 py-2 bg-electric text-white rounded-lg text-sm font-medium 
                       hover:bg-electric-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          <button
            onClick={() => { setFile(null); setPreview(null); }}
            className="px-4 py-2 bg-surface-light text-gray-300 rounded-lg text-sm hover:bg-navy-700"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
