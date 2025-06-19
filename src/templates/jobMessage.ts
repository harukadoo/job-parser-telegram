import { IJob } from "../types/job";

function escapeMarkdownV2(text: string): string {
    return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

export const createJobMessage  = (job: IJob): string => {
    return `*${escapeMarkdownV2(job.title)}*
${escapeMarkdownV2(job.company)}

${job.location ? `📍 ${escapeMarkdownV2(job.location)}\n` : ''}
${job.salary ? `💰 ${escapeMarkdownV2(job.salary)}\n` : ''}

${job.technologies.length > 0 ? `⚙️ Technologies: \`${escapeMarkdownV2(job.technologies.join(', '))}\`` : ''}

[🔗 View Job](${escapeMarkdownV2(job.url)})`;
};