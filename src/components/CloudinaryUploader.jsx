'use client'

import { useState, useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { FiCheck, FiX } from 'react-icons/fi'

export default function CloudinaryUploader({ imageUrl, onImageChange }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUploadSuccess = useCallback(
    (result) => {
      if (result.event === 'success') {
        const url = result.info.secure_url
        onImageChange(url)
        setError('')
        setIsLoading(false)
      }
    },
    [onImageChange]
  )

  const handleUploadError = (error) => {
    setError('Upload failed. Please try again.')
    setIsLoading(false)
  }

  return (
    <div className="space-y-2">
      {/* Upload Widget */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
        onOpen={() => setIsLoading(true)}
        options={{
          maxFiles: 1,
          resourceType: 'image',
          clientAllowedFormats: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
          maxFileSize: 5000000, // 5MB
          folder: 'newsee-blog',
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded transition-colors flex items-center justify-center gap-2"
          >
            📤 {isLoading ? 'Uploading...' : 'Upload Image from Cloudinary'}
          </button>
        )}
      </CldUploadWidget>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Current Image Display */}
      {imageUrl && (
        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded border border-blue-200">
          <FiCheck size={20} className="text-green-600 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">Image uploaded</p>
            <p className="text-xs text-gray-600 break-all">{imageUrl}</p>
            {/* Image preview */}
            <div className="mt-2 max-w-xs">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-auto rounded border border-blue-300"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => onImageChange('')}
            className="text-red-500 hover:text-red-700 flex-shrink-0"
            title="Remove image"
          >
            <FiX size={20} />
          </button>
        </div>
      )}

      {/* Manual URL fallback */}
      <details className="text-sm text-gray-600">
        <summary className="cursor-pointer font-semibold">
          Or paste image URL manually
        </summary>
        <div className="mt-2">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => onImageChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </details>
    </div>
  )
}
