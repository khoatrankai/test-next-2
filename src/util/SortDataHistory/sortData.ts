
const sortData = {
    sortDataByDate: (value: string, arrayData: any) => {
        if (value === 'Mới nhất') {
            return arrayData?.sort((a: any, b: any) => {
                return (
                    Number(b.created_at) -
                    Number(a.created_at)
                );
            });
        } else {
            return arrayData?.sort((a: any, b: any) => {
                return (
                    Number(a.created_at) -
                    Number(b.created_at)
                );
            });
        }
    }
}

export default sortData
