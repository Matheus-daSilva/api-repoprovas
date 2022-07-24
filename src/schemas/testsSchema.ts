import joi from "joi"

export const testsSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().integer().required(),
    teacherDisciplineId: joi.number().integer().required(),
    teacherId: joi.number().integer().required()
})