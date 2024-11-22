import React from "react";
import {Camera, Upload} from "lucide-react";
import {Button} from "@/components/ui/button";

interface ImageUploadProps {
    onImageUpload: (file: File) => void;
    sideEffect: (text: string | null) => void;
}

export default function ImageUpload({onImageUpload, sideEffect}: ImageUploadProps) {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isCameraActive, setIsCameraActive] = React.useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const activateCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "camera-photo.jpg", {
                        type: "image/jpeg",
                    });
                    onImageUpload(file);
                }
            }, "image/jpeg");
            setIsCameraActive(false);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {isCameraActive ? (
                <div className="space-y-4">
                    <video
                        ref={videoRef}
                        autoPlay
                        className="mx-auto mb-4 rounded-lg shadow-md"
                    />
                    <Button onClick={capturePhoto} variant="default">
                        Capture Photo
                    </Button>
                </div>
            ) : (
                <>
                    <form
                        onSubmit={(event) => event.preventDefault()}
                        encType="multipart/form-data"
                    >
                        <p className="mb-4 text-gray-600">
                            Drag and drop an image here, or click to select a file
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                handleFileInput(event);
                                sideEffect(null)
                            }}
                            className="hidden"
                            ref={fileInputRef}
                        />
                        <div className="space-x-4">
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="outline"
                            >
                                <Upload className="w-4 h-4 mr-2"/>
                                Select Image
                            </Button>
                            <Button onClick={activateCamera} variant="outline">
                                <Camera className="w-4 h-4 mr-2"/>
                                Use Camera
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
