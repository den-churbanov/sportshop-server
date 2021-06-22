const getRequestControllerCreator = (modelFunction, checkValidationErrors, ...middlewares ) => {
    return async (req, res) => {
        try {
            if(checkValidationErrors && checkValidationErrors(req, res)) return
            const params = Object.values(req.body)
            let data
            if (params.length) {
                data = await modelFunction(params)
            }
            else {
                data = await modelFunction()
            }
            for (const middlewareFunction of middlewares) {
                if(typeof middlewareFunction === 'function'){
                    data = await middlewareFunction(data, params)
                }
            }
            res.status(200).json(data)
        } catch (e) {
            console.log('Ошибка', e.message)
            res.status(500).json("На сервере произошла ошибка, попробуйте снова")
        }
    }
}


module.exports = {getRequestControllerCreator}
