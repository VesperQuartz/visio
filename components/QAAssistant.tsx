'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from './ImageUpload'
import {useGetAnswer, useUploadImage} from "@/hooks/api";
import {LoaderPinwheel} from "lucide-react";

export default function QAAssistant() {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const upload = useUploadImage();
    const qa = useGetAnswer();

    const handleImageUpload = (file: File) => {
        const url = URL.createObjectURL(file)
        setImageUrl(url)
        const formData = new FormData();
        formData.append("image", file);
        upload.mutate({form: formData});
    }

    const handleQuestionSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if(upload.data?.key) {
                const key = upload.data.key;
                qa.mutate({key, text: question}, {
                    onSuccess: (data) => {
                        setAnswer(data[0].answer);
                    }
                });
            }else {
            //TODO
            }
        } catch (error) {
            console.error('Error getting answer:', error)
            setAnswer('Failed to get an answer. Please try again.')
        }
    }

    return (
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-6 space-y-6">
                <ImageUpload sideEffect={() => null} onImageUpload={handleImageUpload} />
                {imageUrl && (
                    <div className="mt-4 flex justify-center">
                        <img
                            src={imageUrl}
                            alt="Uploaded image"
                            className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                        />
                    </div>
                )}
                {upload.isPending && <p>Your image is uploading...</p>}
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Ask a question about the image"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full"
                    />
                    <Button type="submit" className="w-full">{qa.isPending? <LoaderPinwheel className={"animate-spin"}/>:  "Ask Question"}</Button>
                </form>
                {answer && (
                    <Textarea
                        value={answer}
                        readOnly
                        className="w-full h-32 bg-gray-100"
                    />
                )}
            </CardContent>
        </Card>
    )
}