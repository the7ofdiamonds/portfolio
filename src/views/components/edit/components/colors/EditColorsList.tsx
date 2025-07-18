import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';

import { Color, ColorObject, Colors } from '@the7ofdiamonds/ui-ux';

import { updateColors } from '@/controllers/updateSlice';

import { useAppDispatch } from '@/model/hooks';

import styles from './Colors.module.scss';

interface EditColorsListProps {
    colors: Colors;
    setColors: (colors: Colors) => void
}

export const EditColorsList: React.FC<EditColorsListProps> = ({ colors }) => {
    const dispatch = useAppDispatch();

    const [colorsList, setColorsList] = useState<Set<Color>>(new Set)
    const [color, setColor] = useState<Color>(new Color());

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

    useEffect(() => {
        if (colors && colors.list.size > 0)
            setColorsList(colors.list)
    }, [colors.list]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        color: Color
    ) => {
        const { name, value } = e.target;

        let colorName = color.name;
        let colorValue = color.value;

        const nameRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-color_name$/;
        const valueRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-color_value$/;

        if (nameRegex.test(name)) {
            colorName = value;
        }

        if (valueRegex.test(name)) {
            colorValue = value;
        }

        color.setID(color.id)
        color.setName(colorName)
        color.setValue(colorValue)
    };

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let id = color.id !== '' ? color.id : crypto.randomUUID();
        let colorName = color.name;
        let colorValue = color.value;

        if (name === 'color_name') {
            color.setName(value);
        }

        if (name === 'color_value') {
            color.setValue(value);
        }

        setColor(color);
    }

    const handleAddColor = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (color.name !== '' && !colors.existsInSet(color)) {
                colors.addColor(color)
                setColor(new Color());
            } else {
                throw new Error('Each color requires a name.')
            }
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    };

    const handleUpdateColors = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            dispatch(updateColors(Array.from(colors.list)));
        } catch (error) {
            const err = error as Error;
            setMessage(err.message);
            setMessageType('error');
            setShowStatusBar('show');
        }
    }

    return (
        <div className="update">
            {colors.list.size > 0 ? (
                <div className="colors">
                    <h5 className="title">Colors ({colors.list.size})</h5>
                    <div className="color-row">
                        {Array.from(colors.list).map((color) => (
                            <div className='form-item' key={color.id}>
                                <div className="color" >
                                    <span
                                        className="color-square"
                                        style={{ backgroundColor: color.value }}></span>
                                    <h5>{color.value}</h5>
                                </div>

                                <div className='form-item-flex'>
                                    <label htmlFor={`${color.id}_color_name`}>Name:</label>
                                    <input type="text" name={`${color.id}_color_name`} value={color.name} onChange={(e) => handleChange(e, color)} />
                                </div>

                                <div className='form-item-flex'>
                                    <label htmlFor={`${color.id}_color_value`}>Color:</label>
                                    <input type="color" name={`${color.id}_color_value`} value={color.value} onChange={(e) => handleChange(e, color)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                ''
            )}

            <form action="">
                <hr />

                <h4>Add Color</h4>
                <div className='form-item'>

                    <div className="color">
                        <span
                            className="color-square"
                            style={{ backgroundColor: color.value }}></span>
                        <h5>{color.value}</h5>
                    </div>

                    <div className='form-item-flex'>
                        <label htmlFor="color_name">Name:</label>
                        <input type="text" name='color_name' value={color.name} onChange={handleColorChange} />
                    </div>

                    <div className='form-item-flex'>
                        <label htmlFor="color_value">Color:</label>
                        <input type="color" name='color_value' value={color.value} onChange={handleColorChange} />
                    </div>

                    <button type="submit" onClick={handleAddColor}>
                        <h3>Add Color</h3>
                    </button>
                </div>
            </form>

            <br />

            <button type="button" onClick={handleUpdateColors}><h3>Update Colors</h3></button>
        </div>
    )
}