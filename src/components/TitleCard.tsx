"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTitleContext } from "@/contexts/TitleContext";

interface Title {
  id: string;
  name: string;
  image: string;
  genre: string[];
  year: number;
  rating: number;
}

interface TitleCardProps {
  title: Title;
}

export default function TitleCard({ title }: TitleCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites, debugFavorites } =
    useTitleContext();
  const [isMounted, setIsMounted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Efeito para marcar que o componente foi montado (apenas no cliente)
  useEffect(() => {
    setIsMounted(true);

    // Sincronizar o estado local com o contexto
    const favorite = isFavorite(title.id);
    console.log(
      `TitleCard ${title.id} - ${title.name} - isFavorite:`,
      favorite
    );
    setIsLiked(favorite);
  }, [isFavorite, title.id, title.name]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isMounted) return;

    console.log(
      `TitleCard - Clique em favorito para ${title.id} - ${title.name}`
    );
    console.log(
      `TitleCard - Estado atual: ${isLiked ? "Favorito" : "Não favorito"}`
    );

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    console.log(
      `TitleCard - Novo estado: ${newLikedState ? "Favorito" : "Não favorito"}`
    );

    if (newLikedState) {
      console.log(`TitleCard - Adicionando aos favoritos: ${title.id}`);
      addToFavorites(title.id);
    } else {
      console.log(`TitleCard - Removendo dos favoritos: ${title.id}`);
      removeFromFavorites(title.id);
    }

    // Depura os favoritos após a operação
    setTimeout(() => {
      debugFavorites();
    }, 100);
  };

  return (
    <div className="relative group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
        <Image
          src={title.image}
          alt={title.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold">{title.name}</h3>
            <p className="text-sm">{title.year}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400">★</span>
              <span>{title.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {title.genre.map((g) => (
                <span
                  key={g}
                  className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity duration-300"
      >
        {isMounted &&
          (isLiked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          ))}
      </button>
    </div>
  );
}
