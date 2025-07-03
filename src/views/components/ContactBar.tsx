import React, { useEffect, useState } from 'react'

import ImageComponent from './ImageComponent';

import { ContactMethods } from '@/model/ContactMethods'
import { Contact } from '@/model/Contact';

interface ContactBarProps {
    contactMethods: ContactMethods;
    location: string;
}

export const ContactBar: React.FC<ContactBarProps> = ({ contactMethods, location }) => {
    const [hackerRank, setHackerRank] = useState<Contact | null>(null)
    const [email, setEmail] = useState<Contact | null>(null)
    const [phone, setPhone] = useState<Contact | null>(null)
    const [github, setGithub] = useState<Contact | null>(null)
    const [linkedin, setLinkedin] = useState<Contact | null>(null)
    const [youtube, setYoutube] = useState<Contact | null>(null)
    const [instagram, setInstagram] = useState<Contact | null>(null)
    const [x, setX] = useState<Contact | null>(null)
    const [website, setWebsite] = useState<Contact | null>(null)

    useEffect(() => {
        if (contactMethods && contactMethods.hackerRank) {
            setHackerRank(contactMethods.hackerRank)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.email) {
            setEmail(contactMethods.email)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.phone) {
            setPhone(contactMethods.phone)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.github) {
            setGithub(contactMethods.github)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.linkedin) {
            setLinkedin(contactMethods.linkedin)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.youtube) {
            setYoutube(contactMethods.youtube)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.instagram) {
            setInstagram(contactMethods.instagram)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.website) {
            setWebsite(contactMethods.website)
        }
    }, [contactMethods]);

    useEffect(() => {
        if (contactMethods && contactMethods.x) {
            setX(contactMethods.x)
        }
    }, [contactMethods]);

    const mailTo = email && email.value ? `mailto:${email.value}` : null;
    const callNow = phone && phone.value ? `tel:+${phone.value}` : null;

    return (<div className="contact-bar">
        {mailTo && email && email.image &&
            <a href={mailTo} target="_blank">
                <ImageComponent image={email.image} />
            </a>
        }

        {github && github.image && github.url &&
            <a href={github.url} target="_blank">
                <ImageComponent image={github.image} />
            </a>
        }

        {linkedin && linkedin.image && linkedin.url &&
            <a href={linkedin.url} target="_blank">
                <ImageComponent image={linkedin.image} />
            </a>
        }

        {location !== 'footer' && website && website.image && website.url &&
            <a href={website.url} target="_blank">
                <ImageComponent image={website.image} />
            </a>
        }

        {hackerRank && hackerRank.image && hackerRank.url &&
            <a href={hackerRank.url} target="_blank">
                <ImageComponent image={hackerRank.image} />
            </a>
        }

        {youtube && youtube.image && youtube.url &&
            <a href={youtube.url} target="_blank">
                <ImageComponent image={youtube.image} />
            </a>
        }

        {x && x.image && x.url &&
            <a href={x.url} target="_blank">
                <ImageComponent image={x.image} />
            </a>
        }

        {instagram && instagram.image && instagram.url &&
            <a href={instagram.url} target="_blank">
                <ImageComponent image={instagram.image} />
            </a>
        }

        {callNow && phone && phone.image &&
            <a href={callNow} target="_blank">
                <ImageComponent image={phone.image} />
            </a>
        }
    </div>)
}