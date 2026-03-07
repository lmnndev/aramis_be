export const antiSQLinJector = (value:String) => {
    return value.replace(/[%_]/g, '\\$&');
}