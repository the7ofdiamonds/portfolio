import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/model/store';

import Gallery, { GalleryObject } from '@/model/Gallery'
import { ImageObject } from '@/model/Image';

import {
    setMessage,
    setMessageType,
    setShowStatusBar,
} from '@/controllers/messageSlice';
import { updateDeliveryGallery, updateDesignGallery, updateDevelopmentGallery, updateProblemGallery, updateSolutionGallery } from '@/controllers/updateSlice';

interface UpdateGalleryProps {
    location: string;
    gallery: Gallery | undefined | null;
}

const UpdateGallery: React.FC<UpdateGalleryProps> = ({ location, gallery }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [galleryObject, setGalleryObject] = useState<GalleryObject | null>(null);

    const [logos, setLogos] = useState<Array<ImageObject>>([]);
    const [icons, setIcons] = useState<Array<ImageObject>>([]);
    const [animations, setAnimations] = useState<Array<ImageObject>>([]);
    const [umlDiagrams, setUmlDiagrams] = useState<Array<ImageObject>>([]);
    const [screenshots, setScreenshots] = useState<Array<ImageObject>>([]);
    const [previews, setPreviews] = useState<Array<ImageObject>>([]);

    const [newLogo, setNewLogo] = useState<ImageObject>({ id: '', title: '', url: '', class_name: '' });
    const [newIcon, setNewIcon] = useState<ImageObject>({ id: '', title: '', url: '', class_name: '' });
    const [newAnimation, setNewAnimation] = useState<ImageObject>({ id: '', title: '', url: '', class_name: '' });
    const [newUmlDiagram, setNewUmlDiagram] = useState<ImageObject>({ id: '', title: '', url: '', class_name: '' });
    const [newScreenshot, setNewScreenshot] = useState<ImageObject>({ id: '', title: '', url: '', class_name: '' });
    const [newPreview, setNewPreview] = useState<ImageObject>({ id: '', title: '', url: '', class_name: '' });

    useEffect(() => {
        if (gallery) {
            setGalleryObject(gallery.toGalleryObject());
        }
    }, [gallery, setGalleryObject]);

    const handleNewLogo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLogo((prev) => ({ ...prev, id: crypto.randomUUID(), [name]: value }));
    };

    const handleAddNewLogo = () => {
        if (newLogo && newLogo.title && (newLogo.url || newLogo.class_name)) {
            setLogos((prev) =>
                prev ? [...prev, { ...newLogo }] : [{ ...newLogo }]
            );
            setNewLogo({ id: '', title: '', url: '', class_name: '' });
        };
    }

    const handleNewIcon = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewIcon((prev) => ({ ...prev, id: crypto.randomUUID(), [name]: value }));
    };

    const handleAddNewIcon = () => {
        if (newIcon && newIcon.title && (newIcon.url || newIcon.class_name)) {
            setIcons((prev) =>
                prev ? [...prev, { ...newIcon }] : [{ ...newIcon }]
            );
            setNewIcon({ id: '', title: '', url: '', class_name: '' });
        };
    }

    const handleNewAnimation = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAnimation((prev) => ({ ...prev, id: crypto.randomUUID(), [name]: value }));
    };

    const handleAddNewAnimation = () => {
        if (newAnimation && newAnimation.title && (newAnimation.url || newAnimation.class_name)) {
            setAnimations((prev) =>
                prev ? [...prev, { ...newAnimation }] : [{ ...newAnimation }]
            );
            setNewAnimation({ id: '', title: '', url: '', class_name: '' });
        };
    }

    const handleNewUmlDiagram = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUmlDiagram((prev) => ({ ...prev, id: crypto.randomUUID(), [name]: value }));
    };

    const handleAddNewUmlDiagram = () => {
        if (newUmlDiagram && newUmlDiagram.title && (newUmlDiagram.url || newUmlDiagram.class_name)) {
            setUmlDiagrams((prev) =>
                prev ? [...prev, { ...newUmlDiagram }] : [{ ...newUmlDiagram }]
            );
            setNewUmlDiagram({ id: '', title: '', url: '', class_name: '' });
        };
    }

    const handleNewScreenshot = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewScreenshot((prev) => ({ ...prev, id: crypto.randomUUID(), [name]: value }));
    };

    const handleAddNewScreenshot = () => {
        if (newScreenshot && newScreenshot.title && (newScreenshot.url || newScreenshot.class_name)) {
            setScreenshots((prev) =>
                prev ? [...prev, { ...newScreenshot }] : [{ ...newScreenshot }]
            );
            setNewScreenshot({ id: '', title: '', url: '', class_name: '' });
        };
    }

    const handleNewPreview = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPreview((prev) => ({ ...prev, id: crypto.randomUUID(), [name]: value }));
    };

    const handleAddNewPreview = () => {
        if (newPreview && newPreview.title && (newPreview.url || newPreview.class_name)) {
            setPreviews((prev) =>
                prev ? [...prev, { ...newPreview }] : [{ ...newPreview }]
            );
            setNewPreview({ id: '', title: '', url: '', class_name: '' });
        };
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        state: any[],
        setState: React.Dispatch<React.SetStateAction<ImageObject[]>>
    ) => {
        const { name, value, dataset } = e.target;
        const index = dataset.index ? parseInt(dataset.index, 10) : -1;

        if (index === -1) return;

        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], [name]: value };

        setState(updatedState);
    };

    const handleUpdateGallery = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const updatedGalleryObject: GalleryObject = {
                logos: logos.length > 0 ? logos : null,
                icons: icons.length > 0 ? icons : null,
                animations: animations.length > 0 ? animations : null,
                uml_diagrams: umlDiagrams.length > 0 ? umlDiagrams : null,
                screenshots: screenshots.length > 0 ? screenshots : null,
                previews: previews.length > 0 ? previews : null
            };

            if (location === 'solution') {
                dispatch(updateSolutionGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'design') {
                dispatch(updateDesignGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'development') {
                dispatch(updateDevelopmentGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'delivery') {
                dispatch(updateDeliveryGallery(new Gallery(updatedGalleryObject)));
            }

            if (location === 'problem') {
                dispatch(updateProblemGallery(new Gallery(updatedGalleryObject)));
            }
        } catch (error) {
            const err = error as Error;
            dispatch(setMessage(err.message));
            dispatch(setMessageType('error'));
            dispatch(setShowStatusBar(Date.now()));
        }
    };

    return (
        <details>
            <summary>Gallery</summary>
            <div className='update'>

                <form onSubmit={(e) => e.preventDefault()} id='update_gallery_logos'>
                    {Array.isArray(logos) && logos.length > 0 && (
                        <>
                            <h3>Logos</h3>

                            {logos.map((item: ImageObject, index: number) => (
                                <div className="form-item" key={item.id}>
                                    <div className="form-item-flex">
                                        <label htmlFor="id">ID:</label>
                                        <input
                                            type="text"
                                            placeholder="ID"
                                            value={item.id ?? ""}
                                            name="id"
                                            disabled
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title ?? ""}
                                            name="title"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, logos, setLogos)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            value={item.url ?? ""}
                                            name="url"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, logos, setLogos)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="class_name">Class Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={item.class_name ?? ""}
                                            name="class_name"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, logos, setLogos)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <hr />

                    <h4>Add New Logo</h4>

                    <div className='form-item'>
                        <input type="text" name="title" placeholder="Title" value={newLogo.title} onChange={handleNewLogo} />
                        <input type="text" name="url" placeholder="URL" value={newLogo.url} onChange={handleNewLogo} />
                        <input type="text" name="class_name" placeholder="Class Name" value={newLogo.class_name} onChange={handleNewLogo} />
                        <button type="submit" onClick={handleAddNewLogo}><h3>Add Logo</h3></button>
                    </div>
                </form>

                <form onSubmit={(e) => e.preventDefault()} id='update_gallery_icons'>
                    {Array.isArray(icons) && icons.length > 0 && (
                        <>
                            <h3>Icons</h3>

                            {icons.map((item: ImageObject, index: number) => (
                                <div className="form-item" key={item.id}>
                                    <div className="form-item-flex">
                                        <label htmlFor="id">ID:</label>
                                        <input
                                            type="text"
                                            placeholder="ID"
                                            value={item.id ?? ""}
                                            name="id"
                                            disabled
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title ?? ""}
                                            name="title"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, icons, setIcons)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            value={item.url ?? ""}
                                            name="url"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, icons, setIcons)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="class_name">Class Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={item.class_name ?? ""}
                                            name="class_name"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, icons, setIcons)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <hr />

                    <h4>Add New Icon</h4>

                    <div className='form-item'>
                        <input type="text" name="title" placeholder="Title" value={newIcon.title} onChange={handleNewIcon} />
                        <input type="text" name="url" placeholder="URL" value={newIcon.url} onChange={handleNewIcon} />
                        <input type="text" name="class_name" placeholder="Class Name" value={newIcon.class_name} onChange={handleNewIcon} />
                        <button type="button" onClick={handleAddNewIcon}><h3>Add Icon</h3></button>
                    </div>
                </form>

                <form onSubmit={(e) => e.preventDefault()} id='update_gallery_animations'>
                    {Array.isArray(animations) && animations.length > 0 && (
                        <>
                            <h3>Animations</h3>

                            {animations.map((item: ImageObject, index: number) => (
                                <div className="form-item" key={item.id}>
                                    <div className="form-item-flex">
                                        <label htmlFor="id">ID:</label>
                                        <input
                                            type="text"
                                            placeholder="ID"
                                            value={item.id ?? ""}
                                            name="id"
                                            disabled
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title ?? ""}
                                            name="title"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, animations, setAnimations)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            value={item.url ?? ""}
                                            name="url"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, animations, setAnimations)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="class_name">Class Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={item.class_name ?? ""}
                                            name="class_name"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, animations, setAnimations)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <hr />

                    <h4>Add New Animation</h4>

                    <div className='form-item'>
                        <input type="text" name="title" placeholder="Title" value={newAnimation.title} onChange={handleNewAnimation} />
                        <input type="text" name="url" placeholder="URL" value={newAnimation.url} onChange={handleNewAnimation} />
                        <input type="text" name="class_name" placeholder="Class Name" value={newAnimation.class_name} onChange={handleNewAnimation} />
                        <button type="button" onClick={handleAddNewAnimation}><h3>Add Animation</h3></button>
                    </div>
                </form>

                <form onSubmit={(e) => e.preventDefault()} id='update_gallery_uml_diagrams'>
                    {Array.isArray(umlDiagrams) && umlDiagrams.length > 0 && (
                        <>
                            <h3>UML Diagrams</h3>

                            {umlDiagrams.map((item: ImageObject, index: number) => (
                                <div className="form-item" key={item.id}>
                                    <div className="form-item-flex">
                                        <label htmlFor="id">ID:</label>
                                        <input
                                            type="text"
                                            placeholder="ID"
                                            value={item.id ?? ""}
                                            name="id"
                                            disabled
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title ?? ""}
                                            name="title"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, umlDiagrams, setUmlDiagrams)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            value={item.url ?? ""}
                                            name="url"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, umlDiagrams, setUmlDiagrams)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="class_name">Class Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={item.class_name ?? ""}
                                            name="class_name"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, umlDiagrams, setUmlDiagrams)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <hr />

                    <h4>Add New UML Diagram</h4>

                    <div className='form-item'>
                        <input type="text" name="title" placeholder="Title" value={newUmlDiagram.title} onChange={handleNewUmlDiagram} />
                        <input type="text" name="url" placeholder="URL" value={newUmlDiagram.url} onChange={handleNewUmlDiagram} />
                        <input type="text" name="class_name" placeholder="Class Name" value={newUmlDiagram.class_name} onChange={handleNewUmlDiagram} />
                        <button type="button" onClick={handleAddNewUmlDiagram}><h3>Add UML Diagram</h3></button>
                    </div>
                </form>

                <form onSubmit={(e) => e.preventDefault()} id='update_gallery_screenshot'>
                    {Array.isArray(screenshots) && screenshots.length > 0 && (
                        <>
                            <h3>UML Diagrams</h3>

                            {screenshots.map((item: ImageObject, index: number) => (
                                <div className="form-item" key={item.id}>
                                    <div className="form-item-flex">
                                        <label htmlFor="id">ID:</label>
                                        <input
                                            type="text"
                                            placeholder="ID"
                                            value={item.id ?? ""}
                                            name="id"
                                            disabled
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title ?? ""}
                                            name="title"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, screenshots, setScreenshots)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            value={item.url ?? ""}
                                            name="url"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, screenshots, setScreenshots)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="class_name">Class Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={item.class_name ?? ""}
                                            name="class_name"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, screenshots, setScreenshots)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <hr />

                    <h4>Add New Screenshot</h4>

                    <div className='form-item'>
                        <input type="text" name="title" placeholder="Title" value={newScreenshot.title} onChange={handleNewScreenshot} />
                        <input type="text" name="url" placeholder="URL" value={newScreenshot.url} onChange={handleNewScreenshot} />
                        <input type="text" name="class_name" placeholder="Class Name" value={newScreenshot.class_name} onChange={handleNewScreenshot} />
                        <button type="button" onClick={handleAddNewScreenshot}><h3>Add Screenshot</h3></button>
                    </div>
                </form>

                <form onSubmit={(e) => e.preventDefault()} id='update_gallery_previews'>
                    {Array.isArray(previews) && previews.length > 0 && (
                        <>
                            <h3>Previews</h3>

                            {previews && previews.map((item: ImageObject, index: number) => (
                                <div className="form-item" key={item.id}>
                                    <div className="form-item-flex">
                                        <label htmlFor="id">ID:</label>
                                        <input
                                            type="text"
                                            placeholder="ID"
                                            value={item.id ?? ""}
                                            name="id"
                                            disabled
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title ?? ""}
                                            name="title"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, previews, setPreviews)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="text"
                                            placeholder="URL"
                                            value={item.url ?? ""}
                                            name="url"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, previews, setPreviews)}
                                        />
                                    </div>

                                    <div className="form-item-flex">
                                        <label htmlFor="class_name">Class Name:</label>
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={item.class_name ?? ""}
                                            name="class_name"
                                            data-index={index}
                                            onChange={(e) => handleChange(e, previews, setPreviews)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <hr />

                    <h4>Add New Preview</h4>

                    <div className='form-item'>
                        <input type="text" name="title" placeholder="Title" value={newScreenshot.title} onChange={handleNewPreview} />
                        <input type="text" name="url" placeholder="URL" value={newScreenshot.url} onChange={handleNewPreview} />
                        <input type="text" name="class_name" placeholder="Class Name" value={newScreenshot.class_name} onChange={handleNewPreview} />
                        <button type="button" onClick={handleAddNewPreview}><h3>Add Preview</h3></button>
                    </div>
                </form>

                <hr />

                <button type="button" onClick={handleUpdateGallery}><h3>Update Gallery</h3></button>
            </div>
        </details>
    )
}

export default UpdateGallery;