import React, { useEffect, useState } from 'react';

import { LoginButtonGitHub } from '@the7ofdiamonds/gateway';

import { StatusBar } from '@the7ofdiamonds/ui-ux';
import type {
    MessageType,
    RepoURL,
    StatusBarVisibility
} from '@the7ofdiamonds/ui-ux';

import { ButtonGitHub } from '../../../../buttons/ButtonGitHub';

import styles from './Code.module.scss';

interface CodeProps {
    isAuthenticated: boolean;
    repoURL: RepoURL | null;
    message: string | null;
    show: StatusBarVisibility | null;
    messageType: MessageType | null;
}

export const Code: React.FC<CodeProps> = ({ isAuthenticated, repoURL, message, show, messageType }) => {

    return repoURL && (
        <>
            <h4 className={styles.title}>code</h4>
            {isAuthenticated ? <ButtonGitHub url={repoURL.url} /> : <LoginButtonGitHub />}
            {message && <StatusBar show={show} messageType={messageType} message={message} />}
        </>
    )
}