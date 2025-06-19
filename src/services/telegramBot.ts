import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { IJob } from '../types/job';
import { createJobMessage } from '../templates/jobMessage';

dotenv.config();

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!botToken || !chatId) {
    console.error('Bot token or chat id is not defined in .env file');
    process.exit(1);
}

const bot = new TelegramBot(botToken, { polling: true });

bot.on('polling_error', (error) => {
    console.error("Polling error:", error);
});

export const sendJobNotification = async (job: IJob): Promise<boolean> => {
    try {
        const messageText = createJobMessage(job);

        await bot.sendMessage(chatId, messageText, {
            parse_mode: 'MarkdownV2',
            disable_web_page_preview: true,
        });

        console.log(`Notification sent for job '${job.title}'`);
        return true;

    } catch (error: unknown) {
        console.error(`Error sending notification for job '${job.title}' (${job.url}):`);

        if (error instanceof Error) {
            console.error(error.message);

            if ((error as any).response && (error as any).response.body && (error as any).response.body.description) {
                console.error('Telegram API error details:', (error as any).response.body.description);
            }

        } else {
            console.error(error);
        }

        return false;
    }
}
