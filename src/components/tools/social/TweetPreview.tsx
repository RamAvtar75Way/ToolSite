"use client";

import { useState } from "react";
import { Button, Textarea, Input, Label } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Repeat2, Heart, Share, BarChart2 } from "lucide-react";

export function TweetPreview() {
    const [name, setName] = useState("John Doe");
    const [handle, setHandle] = useState("@johndoe");
    const [text, setText] = useState("Checking out this awesome new tool! #developer #coding");
    const [image, setImage] = useState("");

    return (
        <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Handle</Label>
                    <Input value={handle} onChange={(e) => setHandle(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Tweet Content</Label>
                    <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[100px]"
                        maxLength={280}
                    />
                    <div className="text-xs text-right text-muted-foreground">{text.length}/280</div>
                </div>
                <div className="space-y-2">
                    <Label>Image URL (Optional)</Label>
                    <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
                </div>
            </div>

            <div className="flex items-center justify-center bg-gray-50 dark:bg-black p-8 rounded-xl border">
                <div className="w-full max-w-[600px] bg-white dark:bg-black border rounded-xl overflow-hidden p-4">
                    <div className="flex gap-3">
                        <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${handle}`} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 text-[15px]">
                                <span className="font-bold text-gray-900 dark:text-white truncate">{name}</span>
                                <span className="text-gray-500 truncate">{handle}</span>
                                <span className="text-gray-500">·</span>
                                <span className="text-gray-500">1h</span>
                            </div>

                            <div className="text-[15px] text-gray-900 dark:text-gray-100 whitespace-pre-wrap mb-3">
                                {text}
                            </div>

                            {image && (
                                <div className="mb-3 rounded-xl overflow-hidden border">
                                    <img src={image} alt="Tweet media" className="w-full h-auto object-cover max-h-[400px]" />
                                </div>
                            )}

                            <div className="flex justify-between text-gray-500 max-w-[425px]">
                                <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-500">
                                    <div className="p-2 -m-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                        <MessageCircle className="w-[18px] h-[18px]" />
                                    </div>
                                    <span className="text-[13px]">24</span>
                                </div>
                                <div className="flex items-center gap-2 group cursor-pointer hover:text-green-500">
                                    <div className="p-2 -m-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                                        <Repeat2 className="w-[18px] h-[18px]" />
                                    </div>
                                    <span className="text-[13px]">12</span>
                                </div>
                                <div className="flex items-center gap-2 group cursor-pointer hover:text-pink-500">
                                    <div className="p-2 -m-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
                                        <Heart className="w-[18px] h-[18px]" />
                                    </div>
                                    <span className="text-[13px]">142</span>
                                </div>
                                <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-500">
                                    <div className="p-2 -m-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                        <BarChart2 className="w-[18px] h-[18px]" />
                                    </div>
                                    <span className="text-[13px]">1.2K</span>
                                </div>
                                <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-500">
                                    <div className="p-2 -m-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                        <Share className="w-[18px] h-[18px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
