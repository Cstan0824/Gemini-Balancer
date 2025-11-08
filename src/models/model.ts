export class model {
    filter(property: string, value: any): Array<model> {
        const results: Array<model> = [];
        for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(this))) {
            if (key === property && descriptor.value === value) {
                results.push(this);
            }
        }
        return results;
    }
}   