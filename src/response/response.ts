export const response = (status: number, data, skip?: number, limit?: number, total?: number) => {

    let res = {};
    if (status === 200) {

        res = {
            status,
            message: "Thành công",
            data,
            skip,
            limit,
            total
        }
    } else {

         res = {
            status,
            message: "Không thành công",
            data,
            skip,
            limit,
            total
        }
    }

    return res
}

export const responseRating = (status: number, data: any, skip?: number, limit?: number, total?: number, mediumRating?: any) => {

    let res = {};
    if (status === 200) {

        res = {
            status,
            message: "Thành công",
            data,
            skip,
            limit,
            total,
            mediumRating
        }
    } else {

         res = {
            status,
            message: "Không thành công",
            data,
            skip,
            limit,
            total,
            mediumRating
        }
    }

    return res
}