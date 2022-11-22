import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res) => {
    try {
        const newHotel = await Hotel.create(req.body);

        if (newHotel) {
            res.status(201).json({
                status: "success",
                data: {
                    newHotel,
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error,
        });
    }
};

export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();

        res.status(200).json({
            status: "success",
            results: hotels.length,
            data: {
                hotels,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: {
                updatedHotel,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error,
        });
    }
};

export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;

        await Hotel.findByIdAndDelete(id);

        res.status(204).json({
            status: "success",
            message: "DELETED",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error,
        });
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const { id } = req.params;

        const hotel = await Hotel.findById(id);

        res.status(200).json({
            status: "success",
            data: {
                hotel,
            },
        });
    } catch (error) {
        next(error);
    }
};
