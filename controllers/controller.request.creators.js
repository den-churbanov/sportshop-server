const getRequestControllerCreator = (modelFunction) => {
    return async (req, res) => {
        try {
            const params = Object.values(req.body)
            let data
            if (params.length) {
                data = await modelFunction(params)
            }
            else {
                data = await modelFunction()
            }
            res.status(200).json(data)
        } catch (e) {
            console.log('Ошибка', e.message)
            res.status(500).json("На сервере произошла ошибка, попробуйте снова")
        }
    }
}

module.exports = {getRequestControllerCreator}
