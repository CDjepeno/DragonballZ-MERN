import jwt from 'jsonwebtoken'


export const auth = (req,res,next) => {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) {
        const message = "Vous n'avez pas fourni de token d'authentification"
        res.status(403).json({message})
    }

    console.log(authorizationHeader);

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET, (error, decodedToken) => {
        if(error) {
            const message = "L'utilisateur n'est pas autorisé à acceder à cette ressource"
            res.status(401).json({ message })
        }
    

        const userId = decodedToken.userId

        if(req.body.userId && req.body.userId !== userId) {
            const message = "L'identification de l'utilisateur est invalide"
            res.status(401).json({ message })
        } else {
            next()
        }
    })
}