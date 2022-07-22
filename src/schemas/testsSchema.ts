import joi from "joi"

export const testsSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
})