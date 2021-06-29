import Joi from 'joi';

export const orderSchema = Joi.object().keys({
  sessionID: Joi.string().alphanum().min(20).max(20).required(),
  restaurantID: Joi.string().alphanum().min(20).max(20).required(),
  tableID: Joi.string().alphanum().min(20).max(20).required(),
  order: Joi.array()
    .items(
      Joi.object().keys({
        consumable_type: Joi.string().valid('food', 'drinks').required(),
        details: Joi.array().items(
          Joi.object().keys({
            category_name: Joi.string().required(),
            category_id: Joi.string().alphanum().min(20).max(20).required(),
            items: Joi.array().items(
              Joi.object().keys({
                indicator: Joi.string().required(),
                title: Joi.string().required(),
                price: Joi.number().required(),
                img_url: Joi.string(),
                id: Joi.string().required(),
                quantity: Joi.number().required(),
                customizable: Joi.array().items(
                  Joi.object().keys({
                    optionTitle: Joi.string().required(),
                    optionPrice: Joi.number().required(),
                    optionQuantity: Joi.number().required(),
                    optionId: Joi.string().required(),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    )
    .required(),
});
