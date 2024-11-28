"use client";
import Image from "next/image";
import { Model } from "./Model";
import { useState } from "react";

export default function Home() {
  
  const [model,setModel] = useState<Model|null>(null);

  const nouvellePartie = () => {
    fetch("/api/games", {
      method: "POST"
    }).then(async (response) => {
      const data = await response.json();
      setModel(data);
    });
  }

  const recupererPartie = (id:string) => {
    fetch("/api/games/" + id , {
      method: "GET"
    }).then(async (response) => {
      const data = await response.json();
      setModel(data);
  });
  
  }

  const jouer = (position:number) => {
    
    const newModel = {...model!};
    newModel!.board[position] = newModel!.playerFront;
    
    fetch("/api/games/" + model?.id + "/move", {
      method: "PUT",
      body: JSON.stringify(newModel),
    }).then(async (response) => {
      const data = await response.json();
      setModel(data);
  });
  
  }
  
  return (null
  );
}

