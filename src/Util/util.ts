export const formatString = (template: string, ...args: string[]): string => {
    return template.replace(/{(\d+)}/g, (match, number) =>
        typeof args[number] != 'undefined' ? args[number] : match
    )
}
