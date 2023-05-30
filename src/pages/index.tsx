import { MinesWeeperBoard, MinesWeeperCell } from '@/interfaces/minesweeper'
import {
    generateBoard,
    generateVoidBoard,
} from '@/factories/minesweeper.factory'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import MinesWeeper from '@/components/MinesWeeper'

export default function Home() {
    const [firstClick, setFirstClick] = useState(true)

    const [minesWeeperConfig, setMinesWeeperConfig] = useState({
        columns: 8,
        rows: 8,
        mines: 10,
    })
    const [board, setBoard] = useState<MinesWeeperBoard>([])

    useEffect(() => {
        setBoard(generateVoidBoard(minesWeeperConfig))
    }, [minesWeeperConfig])

    const updateBoard = (cellClicked: MinesWeeperCell) => {
        if (firstClick) {
            setFirstClick(false)
            return setBoard(generateBoard(cellClicked, minesWeeperConfig))
        }
        if (cellClicked.isRevealed) return

        setBoard((currentBoard) => {
            const newBoard = [...currentBoard]
            newBoard[cellClicked.row] = newBoard[cellClicked.row].map(
                (cell) => {
                    if (cell.column !== cellClicked.column) return cell
                    return { ...cell, isRevealed: true }
                }
            )
            return newBoard
        })
    }

    return (
        <Box>
            <MinesWeeper board={board} onCellClick={updateBoard}></MinesWeeper>
        </Box>
    )
}
