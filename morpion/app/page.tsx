"use client"
import { useState } from 'react'
import { Model } from './Model'
export default function Home() {

  const errorMessage = "Erreur de connexion avec les loosers"
  const [error, setError] = useState(false)
  const [model, setModel] = useState<Model>({
    id: '0',
    board: ["", "", "", "", "", "", "", "", ""],
    playerFront: 'X',
    playerBack: 'O',
    winner: null
  });

  const nouvellePartie = () => {
    fetch("http://localhost:3001/api/games", {
      method: "POST",
      mode: 'cors'
    }).then(async (response) => {
      const data = await response.json();
      setModel(data);
    }).catch(() => {
      setError(true)
    });
  }

  const recupererPartie = (id: string) => {
    fetch("http://localhost:3001/api/games/" + id, {
      method: "GET",
      mode: 'cors'
    }).then(async (response) => {
      const data = await response.json();
      setModel(data);
    }).catch(() => {
      setError(true)
    });

  }

  const jouer = (position: number) => {

    const newModel = { ...model };
    newModel.board[position] = newModel.playerFront;

    fetch("http://localhost:3001/api/games/" + model?.id + "/move", {
      method: "PUT",
      mode: 'cors',
      body: JSON.stringify(newModel),
    }).then(async (response) => {
      const data = await response.json();
      setModel(data);
    }).catch(() => {
      setError(true)
    });;

  }
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row p-3 gap-3  text-3xl'>
        <h1 className='font-semibold'>PARTIE</h1>
        <div>{model?.id}</div>
      </div>
      {error && <div className="m-4 border-2 text-red-500 border-red-500 h-1/2 w-1/4 p-3">
        {errorMessage}
      </div>}
      <div className=' p-3 gap-3'>
        <div className="p-3 grid grid-cols-3 grid-rows-3 grid-flow-col gap-4 flex w-1/4">
          {model?.board.map((data: string, index: number) =>
            <div onClick={() => { jouer(index) }} className=" flex border-4 justify-center" key={index}>{data}</div>
          )}
        </div>
      </div>
      {model.winner == 'X' && model.winner !== null && <div className="m-4 border-2 text-green-500 border-green-500 h-1/2 w-1/4 p-3">
        {'Gagné'}
      </div>}
      {model.winner === 'O' && model.winner !== null && <div className="m-4 border-2 text-red-500 border-red-500 h-1/2 w-1/4 p-3">
        {'Perdu'}
      </div>}
      {model.winner === 'DRAW' && model.winner !== null && <div className="m-4 border-2 text-blue-500 border-blue-500 h-1/2 w-1/4 p-3">
        {'Match nul'}
      </div>}
      <div className='flex flex-row w-1/3'>
        {/* <div onClick={() => { jouer() }} className=" m-4 border-2 text-blue-00 border-blue-500 bg-blue-200 h-1/2 w-1/4 p-3">
          {'Jouer'}
        </div> */}
        <div onClick={nouvellePartie} className="m-4 border-2 text-black-500 bg-gray-200 border-gray-500 h-1/2 w-1/4 p-3">
          {'Nouvelle Partie'}
        </div>
        <div onClick={() => { recupererPartie(model?.id) }} className="m-4 radius-100 border-2 text-green-800 bg-green-200 border-green-500 h-1/2 w-1/4 p-3">
          {'Continuer partie'}
        </div>
      </div>
    </div>)

}