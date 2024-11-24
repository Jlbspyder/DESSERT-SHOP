import React from 'react';
import './allergens.css';

const Allergens = () => {
  return (
    <div className='allergens'>
      <div className='allergens-info'>
        <h1>Key Standards</h1>
        <p>
          - Allergen communication must be posted
          <br />
          - Allergen Back of House (BOH) procedures must be followed
          <br />- Allergen poster should be placed by POS if there is an
          allergen in a product currently being served
        </p>
        <h2>
          If a guest has questions about possible allergens in menu items:
        </h2>
        <p>
          Direct them to the nutritional information provided at our website and
          the nutritional brochure in restaurant, if applicable.
        </p>
        <p>
          If a guest requests a “special order,” make an extra effort to assure
          it is prepared correctly and that the preparation area and food
          contact surfaces are cleaned and sanitized.
        </p>
        <p>
          If an allergic ingredient is accidentally placed on or touches the
          special order, do NOT serve the order, as even the traces of the
          removed ingredient can cause the allergic reaction. Prepare another
          fresh, Made to Order item, ensuring the allergic ingredient is never
          in contact with the food item prepared.
        </p>
        <p>
          If a guest complains that there was an error in the order, and the
          food item was prepared with the allergic ingredient, do NOT try to
          solve the problem by removing the ingredient from the prepared item.
          Make another fresh, Made to order item, ensuring the allergic
          ingredient is never in contact with the food item prepared. Removing
          the allergic ingredient from a prepared sandwich can still cause a
          reaction to the allergic guest. It is also a food safety violation to
          re-serve any food that has been returned by a guest.
        </p>
        <h2>If a guest informs you she/he is having an allergic reaction:</h2>
        <p>Show concern and ask if medical attention is needed</p>
        <p>
          Symptoms of an allergic reaction include: - Itching around the mouth,
          face, or scalp
          <br />
          - Tightening of the throat
          <br />
          - Hives
          <br />
          - Wheezing or shortness of breath
          <br />
          - Swelling of the face, eyes, hands, or feet
          <br />
          - Abdominal cramps, diarrhea, or vomiting
          <br />- Loss of consciousness
        </p>
        <p>
          If necessary, call local authorities immediately. Quick medical
          attention can save a life.
        </p>
        <p>
          Report all food allergy incidents to DESSERTS's Crisis/Incident Hotline
          (+2348060429860).
        </p>
      </div>
    </div>
  );
};

export default Allergens;
