import React, { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first.");
      return;
    }

    setLoading(true);

    try {
      await new Promise(res => setTimeout(res, 1000));
      const simulated = [
        `https://via.placeholder.com/512?text=${encodeURIComponent(prompt)}+1`,
        `https://via.placeholder.com/512?text=${encodeURIComponent(prompt)}+2`,
      ];
      setImages(simulated);
    } catch (err) {
      console.error("Image generation failed", err);
      alert("Failed to generate images. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            disabled={loading}
            className={`w-full p-3 text-white rounded-lg transition duration-200 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.length === 0 ? (
            <p className="text-gray-500">No images yet. Try generating something.</p>
          ) : (
            images.map((src, idx) => (
              <div key={idx} className="bg-white p-2 rounded shadow">
                <img src={src} alt={`generated ${idx}`} className="w-full h-auto rounded" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
