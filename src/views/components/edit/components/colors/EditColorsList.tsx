import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { updateColors } from '@/controllers/updateSlice';

import type { AppDispatch } from '@/model/store';
import { Color } from '@/model/Color';
import { Colors } from '@/model/Colors';

import styles from './Colors.module.scss';

interface EditColorsListProps {
    colors: Colors;
    setVal: (value: Colors) => void
}

export const EditColorsList: React.FC<EditColorsListProps> = ({ colors, setVal }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [color, setColor] = useState<Color>(new Color());

    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<string>('info');
    const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

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

        const updatedColors = Array.from(colors.list).map((c) =>
            c.id === color.id ?
                new Color({
                    id: color.id,
                    name: ColorName,
                    value: colorValue,
                }) : c
        );
        console.log(updatedColors)
        setVal(new Colors(updatedColors))
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
                const exists = colors.existsInSet(color);

                if (!exists) {
                    colors.addColor(color)
                }

                setVal(colors);
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
        <div className={styles.edit}>
            {colors.list.size > 0 ? (
                <div className={styles.colors}>
                    <h5 className={styles.title}>Colors ({colors.list.size})</h5>
                    <div className={styles['color-row']}>
                        {Array.from(colors.list).map((color) => (
                            <div className={styles['form-item']} key={color.id}>
                                <div className={styles.color} >
                                    <span
                                        className={styles['color-square']}
                                        style={{ backgroundColor: color.value }}></span>
                                    <h5>{color.value}</h5>
                                </div>

                                <div className={styles['form-item-flex']}>
                                    <label className={styles.label} htmlFor={`${color.id}_color_name`}>Name:</label>
                                    <input className={styles.input} type="text" name={`${color.id}_color_name`} value={color.name} onChange={(e) => handleChange(e, color)} />
                                </div>

                                <div className={styles['form-item-flex']}>
                                    <label className={styles.label} htmlFor={`${color.id}_color_value`}>Color:</label>
                                    <input className={styles.input} type="color" name={`${color.id}_color_value`} value={color.value} onChange={(e) => handleChange(e, color)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                ''
            )}

            <form className={styles.form} action="">
                <hr />

                <h4>Add Color</h4>
                <div className={styles['form-item']}>

                    <div className={styles.color}>
                        <span
                            className={styles['color-square']}
                            style={{ backgroundColor: color.value }}></span>
                        <h5>{color.value}</h5>
                    </div>

                    <div className={styles['form-item-flex']}>
                        <label className={styles.label} htmlFor="color_name">Name:</label>
                        <input className={styles.input} type="text" name='color_name' value={color.name} onChange={handleColorChange} />
                    </div>

                    <div className={styles['form-item-flex']}>
                        <label className={styles.label} htmlFor="color_value">Color:</label>
                        <input className={styles.input} type="color" name='color_value' value={color.value} onChange={handleColorChange} />
                    </div>

                    <button className={styles.button} type="submit" onClick={handleAddColor}>
                        <h3>Add Color</h3>
                    </button>
                </div>
            </form>

            <br />

            <button className={styles.button} type="button" onClick={handleUpdateColors}><h3>Update Colors</h3></button>
        </div>
    )
}