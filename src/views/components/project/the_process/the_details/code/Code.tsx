import React from 'react';

import { LoginButtonGitHub } from '@the7ofdiamonds/gateway';
import { StatusBar } from '@the7ofdiamonds/ui-ux';
import type {
    MessageType,
    RepoURL,
    StatusBarVisibility
} from '@the7ofdiamonds/ui-ux';

import styles from './Code.module.scss';

interface CodeProps {
    repoURL: RepoURL | null;
    message: string | null;
    show: StatusBarVisibility | null;
    messageType: MessageType | null;
}

export const Code: React.FC<CodeProps> = ({ repoURL, message, show, messageType }) => {
    const action = () => {
        if (repoURL && repoURL?.url) {
            window.open(repoURL.url, "_blank", "noopener,noreferrer")
        }
    }

    return repoURL && repoURL.url && (
        <div className={styles.code}>
            <h4 className={styles.title}>code</h4>
            <LoginButtonGitHub action={action} instruction={"Go to Repo"}/>
            {message && <StatusBar show={show} messageType={messageType} message={message} />}
        </div>
    )
}