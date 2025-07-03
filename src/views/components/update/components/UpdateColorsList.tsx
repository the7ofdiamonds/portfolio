import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/model/store';

import Color, { ColorObject, existsInSet } from '@/model/Color';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateColors } from '@/controllers/updateSlice';

interface UpdateColorsListProps {
    colorsObject: Array<ColorObject>;
}

const UpdateColorsList: React.FC<UpdateColorsListProps> = ({ colorsObject }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [colors, setColors] = useState<Set<Color>>(new Set(colorsObject.map((color) => new Color(color))));
    const [color, setColor] = useState<Color>(new Color());

    useEffect(() => { setColors(new Set(colorsObject.map((color) => new Color(color)))) }, [colorsObject, setColors]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        color: Color
    ) => {
        const { name, value } = e.target;

        let ColorName = color.name;
        let colorValue = color.value;

        const nameRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-color_name$/;
        const valueRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}-color_value$/;

        if (nameRegex.test(name)) {
            ColorName = value;
        }

        if (valueRegex.test(name)) {
            colorValue = value;
        }

        const updatedColors = Array.from(colors).map((c) =>
            c.id === color.id ?
                new Color({
                    id: color.id,
                    name: ColorName,
                    value: colorValue,
                }) : c
        );

        setColors(new Set(updatedColors));
    };

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        let id = color.id !== '' ? color.id : crypto.randomUUID();
        let colorName = color.name;
        let colorValue = color.value;

        if (name === 'color_name') {
            colorName = value;
        }

        if (name === 'color_value') {
            colorValue = value;
        }

        setColor(new Color({
            id: id,
            name: colorName,
            value: colorValue
        }));
    }

    const handleAddColor = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (color.name !== '') {
                setColors((prevColors) => {
                    const exists = existsInSet(color, colors);
                    return exists ? new Set(Array.from(prevColors).filter((c) => c.id !== color.id)) : prevColors.add(color);
                });

                setColor(new Color());
            } else {
                throw new Error('Each color requires a name.')
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    const handleUpdateColors = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            dispatch(updateColors(Array.from(colors)));
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    }

    return (
        <div className="update">
            {colors.size > 0 ? (
                <div className="colors">
                    <h5 className="title">Colors ({colors.size})</h5>
                    <div className="color-row">
                        {Array.from(colors).map((color) => (
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

export default UpdateColorsList