import db from '../../database/connection';


class CargoController {

    async index(req, res) {
        const cargos = await db("cargo");

        return res.json(cargos);
    }


}

export default new CargoController();
     