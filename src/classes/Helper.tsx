export function getNum(val: number) {
    val = +val || 0
    return val;
}

class HelperClass {

    public IsInteger(value: any): boolean {
        if (/^(\-|\+)?([0-9]+)$/.test(value) === false) return false;

        var valueInNumber = Number(value);
        return Number.isInteger(valueInNumber) && (Math.abs(valueInNumber) < 2147483647);
    }

    public IsDate(value: any): boolean {
        switch (typeof value) {
            case 'number':
                return true;
            case 'string':
                return !isNaN(Date.parse(value));
            case 'object':
                if (value instanceof Date) {
                    return !isNaN(value.getTime());
                } else {
                    return false;
                }
            default:
                return false;
        }
    }

    public LoadParameterFromURLQuery(parameterName: string, validateParameterType: "string" | "date" | "number", defaultValue: any): any {
        try {
            var searchParams = new URLSearchParams(window.location.search);

            var parameterExist = searchParams.get(parameterName);
            if (parameterExist == null) return defaultValue;

            switch (validateParameterType) {
                case "date":
                    if (this.IsDate(parameterExist) === true) {
                        return parameterExist
                    }
                    else {
                        return defaultValue;
                    }
                case "number":
                    if (this.IsInteger(parameterExist) === true) {
                        return parseInt(parameterExist)
                    } else {
                        return defaultValue;
                    }
                case "string":
                    if (typeof parameterExist == "undefined" || parameterExist == null || parameterExist.trim().length <= 0) return defaultValue;
                    return parameterExist.toString();
            }
        }
        catch (error) {
            return defaultValue;
        }
    }
}

export const Helpers = new HelperClass();