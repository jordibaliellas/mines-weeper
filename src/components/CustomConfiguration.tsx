import { Resolver, useForm } from 'react-hook-form'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { MinesweeperConfig } from '@/interfaces/minesweeper'
import TextField from '@mui/material/TextField'

interface CustomConfigurationProps {
    opened: boolean
    onCloseDialog: (config?: MinesweeperConfig) => void
}

const resolver: Resolver<MinesweeperConfig> = async (
    config: MinesweeperConfig
) => {
    const errors: Record<string, any> = {}
    if (config.rows < 1) {
        errors.rows = {
            type: 'min',
            message: 'Rows must be greater than 0',
        }
    }

    if (config.columns < 1) {
        errors.columns = {
            type: 'min',
            message: 'Columns must be greater than 0',
        }
    }

    const maxMines = config.rows * config.columns
    if (config.mines >= maxMines) {
        errors.mines = {
            type: 'max',
            message: `Mines must be less than ${maxMines}`,
        }
    }

    return {
        values: config,
        errors,
    }
}

export default function CustomConfiguration({
    opened,
    onCloseDialog,
}: CustomConfigurationProps) {
    const dismiss = () => onCloseDialog()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MinesweeperConfig>({ resolver })

    return (
        <Dialog open={opened} onClose={dismiss}>
            <DialogTitle>Custom mines weeper</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    error={!!errors.rows}
                    margin="dense"
                    id="rows"
                    label="Rows"
                    {...register('rows', {
                        valueAsNumber: true,
                    })}
                    type="number"
                    variant="standard"
                    helperText={errors.rows ? errors.rows.message : ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    error={!!errors.columns}
                    id="columns"
                    label="Columns"
                    {...register('columns', {
                        valueAsNumber: true,
                    })}
                    type="number"
                    variant="standard"
                    helperText={errors.columns ? errors.columns.message : ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    error={!!errors.mines}
                    id="mines"
                    label="Mines"
                    {...register('mines', {
                        valueAsNumber: true,
                    })}
                    type="number"
                    variant="standard"
                    helperText={errors.mines ? errors.mines.message : ''}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={dismiss}>Cancel</Button>
                <Button onClick={handleSubmit(onCloseDialog)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
