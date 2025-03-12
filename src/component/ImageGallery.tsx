import React, { useState } from 'react'

interface ImageGalleryProps {
  images: string[];
  likedImages: any[];
}

function ImageGallery({ images, likedImages }: ImageGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 9

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * imagesPerPage
  const endIndex = startIndex + imagesPerPage
  const currentImages = images.slice(startIndex, endIndex)

  const totalPages = Math.ceil(images.length / imagesPerPage)

  return (
    <div>
  <div className="grid grid-cols-3 gap-4">
  {currentImages.map((image, index) => (
    <div key={index} className="flex justify-center items-center bg-white  p-2  border border-gray-300">
      <img
        src={image}
        alt={`Image ${index}`}
        className="max-w-full max-h-full"
      />
    </div>
  ))}
</div>


      <div className="mt-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="mx-2 text-red-500">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>

      <div>Liked Images: {likedImages.length}</div>
    </div>
  )
}

export default ImageGallery
