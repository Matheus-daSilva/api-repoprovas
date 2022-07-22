import joi from "joi"

export const testsSchema = joi.object({
    name: joi.string().required(),
    pdfURL: joi.string().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
})