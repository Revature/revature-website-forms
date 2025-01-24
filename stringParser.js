// const schoolStrings = [
//     "001VS00000GDjUUYA1|Aguascalientes Institute of Technology (Mexico)",
//     "001VS00000GDjUPYA1|Antonio Narro Agrarian Autonomous University (Mexico)",
//     "001VS00000GDjVBYA1|Autonomous University of Aguascalientes (Mexico)",
//     "001VS00000GDjVCYA1|Autonomous University of Baja California (Mexico)",
//     "001VS00000GDjVDYA1|Autonomous University of Baja California Sur (Mexico)",
//     "001VS00000GDjVEYA1|Autonomous University of Campeche (Mexico)",
//     "001VS00000GDjVWYA1|Autonomous University of Carmen (Mexico)",
//     "001VS00000GDjVFYA1|Autonomous University of Chiapas (Mexico)",
//     "001VS00000GDjVGYA1|Autonomous University of Chihuahua (Mexico)",
//     "001VS00000GDjVHYA1|Autonomous University of Ciudad Juarez (Mexico)",
//     "001VS00000GDjVJYA1|Autonomous University of Coahuila (Mexico)",
//     "001VS00000GDjVKYA1|Autonomous University of Durango (Mexico)",
//     "001VS00000GDjVLYA1|Autonomous University of Guerrero (Mexico)",
//     "001VS00000GDjVIYA1|Autonomous University of Mexico City (Mexico)",
//     "001VS00000GDjVMYA1|Autonomous University of Nayarit (Mexico)",
//     "001VS00000GDjVNYA1|Autonomous University of Nuevo Leon (Mexico)",
//     "001VS00000GDjVPYA1|Autonomous University of Querétaro (Mexico)",
//     "001VS00000GDjVQYA1|Autonomous University of San Luis Potosi (Mexico)",
//     "001VS00000GDjVRYA1|Autonomous University of Sinaloa (Mexico)",
//     "001VS00000GDjVSYA1|Autonomous University of Tamaulipas (Mexico)",
//     "001VS00000GDjVXYA1|Autonomous University of the State of Hidalgo (Mexico)",
//     "001VS00000GDjVYYA1|Autonomous University of the State of Mexico",
//     "001VS00000GDjVZYA1|Autonomous University of the State of Morelos (Mexico)",
//     "001VS00000GDjVOYA1|Autonomous University of the West (Mexico)",
//     "001VS00000GDjVTYA1|Autonomous University of Tlaxcala (Mexico)",
//     "001VS00000GDjVUYA1|Autonomous University of Yucatan (Mexico)",
//     "001VS00000GDjVVYA1|Autonomous University of Zacatecas (Mexico)",
//     "001VS00000GDjVAYA1|Benito Juarez Autonomous University of Oaxaca (Mexico)",
//     "001VS00000GDjUVYA1|Celaya Technological Institute (Mexico)",
//     "001VS00000GDjUQYA1|Chapingo Autonomous University (Mexico)",
//     "001VS00000GDjUWYA1|Chetumal Technological Institute (ITCH) (Mexico)",
//     "001VS00000GDjUcYAL|Durango Institute of Technology (Mexico)",
//     "001VS00000GDjUxYAL|El Llano Technological Institute (ITLLANO) (Mexico)",
//     "001VS00000GDjULYA1|General Coordination of Technological and Polytechnic Universities (CGUT) (Mexico)",
//     "001VS00000GDjUeYAL|Hermosillo Technological Institute (Mexico)",
//     "001VS00000GDjUyYAL|Higher Technological Institute of Acayucan (Mexico)",
//     "001VS00000GDjUzYAL|Higher Technological Institute of Cajeme (Mexico)",
//     "001VS00000GDjV0YAL|Higher Technological Institute of Ciudad Constitución (ITSCC) (Mexico)",
//     "001VS00000GDjVhYAL|Juarez Autonomous University of Tabasco (Mexico)",
//     "001VS00000GDjViYAL|Juarez University of the State of Durango (Mexico)",
//     "001VS00000GDjV9YAL|Meritorious Autonomous University of Puebla (Mexico)",
//     "001VS00000GDjVaYAL|Metropolitan Autonomous University (Mexico)",
//     "001VS00000GDjVjYAL|Michoacan University of San Nicolas de Hidalgo (Mexico)",
//     "001VS00000GDjV1YAL|Minatitlán Institute of Technology (ITM) (Mexico)",
//     "001VS00000GDjUSYA1|National Autonomous University of Mexico",
//     "001VS00000GDjUMYA1|National Pedagogical University (Mexico)",
//     "0013g00000aNInnAAG|National Polytechnic Institute (Mexico)",
//     "001VS00000GDjUOYA1|National Technological Institute of Mexico",
//     "001VS00000GDjURYA1|Open and Distance University of Mexico",
//     "001VS00000GDjVlYAL|Popular Autonomous University of Veracruz (Mexico)",
//     "001VS00000GDjV3YAL|Poza Rica Higher Technological Institute (ITSPR) (Mexico)",
//     "001VS00000GDjUkYAL|Puebla Institute of Technology (ITO) (Mexico)",
//     "001VS00000GDjV4YAL|Puerto Penasco Higher Technological Institute (ITSPP) (Mexico)",
//     "001VS00000GDjUnYAL|Sonora Institute of Technology (Mexico)",
//     "001VS00000GDjV6YAL|Southern Guanajuato Technological Institute (Mexico)",
//     "001VS00000GDjUTYA1|Technological Institute of Acapulco (Mexico)",
//     "001VS00000GDjUjYAL|Technological Institute of Arteaga Pavilion (Mexico)",
//     "001VS00000GDjUYYA1|Technological Institute of Chihuahua II (Mexico)",
//     "001VS00000GDjUXYA1|Technological Institute of Chihuahua (Mexico)",
//     "001VS00000GDjUZYA1|Technological Institute of Ciudad Juarez (Mexico)",
//     "001VS00000GDjUaYAL|Technological Institute of Ciudad Madero (Mexico)",
//     "001VS00000GDjV2YAL|Technological Institute of Coatzacoalcos (ITESCO) (Mexico)",
//     "001VS00000GDjUbYAL|Technological Institute of Culiacan (Mexico)",
//     "001VS00000GDjUdYAL|Technological Institute of Ensenada (Mexico)",
//     "001VS00000GDjUfYAL|Technological Institute of La Paz (Mexico)",
//     "001VS00000GDjUgYAL|Technological Institute of Mexicali (Mexico)",
//     "001VS00000GDjUhYAL|Technological Institute of Morelia (ITM) (Mexico)",
//     "001VS00000GDjUiYAL|Technological Institute of Oaxaca (ITO) (Mexico)",
//     "001VS00000GDjUlYAL|Technological Institute of Querétaro (ITQ) (Mexico)",
//     "001VS00000GDjUmYAL|Technological Institute of Saltillo (Mexico)",
//     "001VS00000GDjUoYAL|Technological Institute of Tepic (ITT) (Mexico)",
//     "001VS00000GDjUtYAL|Technological Institute of the Valley of Oaxaca (ITVO) (Mexico)",
//     "001VS00000GDjUqYAL|Technological Institute of Toluca (Mexico)",
//     "001VS00000GDjUrYAL|Technological Institute of Tuxtepec (Mexico)",
//     "001VS00000GDjUsYAL|Technological Institute of Tuxtla Gutierrez (Mexico)",
//     "001VS00000GDjUuYAL|Technological Institute of Veracruz (Mexico)",
//     "001VS00000GDjV5YAL|Technological Institute of Zacapoaxtla (ITSZ) (Mexico)",
//     "001VS00000GDjUwYAL|Technological Institute of Zacatepec (Mexico)",
//     "001VS00000GDjUpYAL|Tijuana Institute of Technology (ITT) (Mexico)",
//     "001VS00000GDjVcYAL|University of Colima (Mexico)",
//     "001VS00000GDjVdYAL|University of Guadalajara (Mexico)",
//     "001VS00000GDjVeYAL|University of Guanajuato (Mexico)",
//     "001VS00000GDjVfYAL|University of Quintana Roo (Mexico)",
//     "001VS00000GDjVbYAL|University of Sciences and Arts of Chiapas (Mexico)",
//     "001VS00000GDjVgYAL|University of Sonora (Mexico)",
//     "001VS00000GDjVkYAL|Veracruz University (Mexico)",
//     "001VS00000GDjUvYAL|Villahermosa Technological Institute (Mexico)",
//     "001VS00000GDjV7YAL|Western Zacatecas Higher Technological Institute (Mexico)",
//     "001VS00000GDjV8YAL|Zapopan Higher Technological Institute (Mexico)",
//   ];

//   const schools = schoolStrings.map(school => {
//     const [value, label] = school.split('|');
//     return { value, label };
//   });

//   console.log(schools);



// const existingArray = [
//   {
//     value: '001VS00000GDjUUYA1',
//     label: 'Aguascalientes Institute of Technology (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUPYA1',
//     label: 'Antonio Narro Agrarian Autonomous University (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVBYA1',
//     label: 'Autonomous University of Aguascalientes (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVCYA1',
//     label: 'Autonomous University of Baja California (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVDYA1',
//     label: 'Autonomous University of Baja California Sur (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVEYA1',
//     label: 'Autonomous University of Campeche (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVWYA1',
//     label: 'Autonomous University of Carmen (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVFYA1',
//     label: 'Autonomous University of Chiapas (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVGYA1',
//     label: 'Autonomous University of Chihuahua (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVHYA1',
//     label: 'Autonomous University of Ciudad Juarez (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVJYA1',
//     label: 'Autonomous University of Coahuila (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVKYA1',
//     label: 'Autonomous University of Durango (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVLYA1',
//     label: 'Autonomous University of Guerrero (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVIYA1',
//     label: 'Autonomous University of Mexico City (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVMYA1',
//     label: 'Autonomous University of Nayarit (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVNYA1',
//     label: 'Autonomous University of Nuevo Leon (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVPYA1',
//     label: 'Autonomous University of Querétaro (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVQYA1',
//     label: 'Autonomous University of San Luis Potosi (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVRYA1',
//     label: 'Autonomous University of Sinaloa (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVSYA1',
//     label: 'Autonomous University of Tamaulipas (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVXYA1',
//     label: 'Autonomous University of the State of Hidalgo (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVYYA1',
//     label: 'Autonomous University of the State of Mexico'
//   },
//   {
//     value: '001VS00000GDjVZYA1',
//     label: 'Autonomous University of the State of Morelos (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVOYA1',
//     label: 'Autonomous University of the West (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVTYA1',
//     label: 'Autonomous University of Tlaxcala (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVUYA1',
//     label: 'Autonomous University of Yucatan (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVVYA1',
//     label: 'Autonomous University of Zacatecas (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVAYA1',
//     label: 'Benito Juarez Autonomous University of Oaxaca (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUVYA1',
//     label: 'Celaya Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUQYA1',
//     label: 'Chapingo Autonomous University (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUWYA1',
//     label: 'Chetumal Technological Institute (ITCH) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUcYAL',
//     label: 'Durango Institute of Technology (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUxYAL',
//     label: 'El Llano Technological Institute (ITLLANO) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjULYA1',
//     label: 'General Coordination of Technological and Polytechnic Universities (CGUT) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUeYAL',
//     label: 'Hermosillo Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUyYAL',
//     label: 'Higher Technological Institute of Acayucan (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUzYAL',
//     label: 'Higher Technological Institute of Cajeme (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV0YAL',
//     label: 'Higher Technological Institute of Ciudad Constitución (ITSCC) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVhYAL',
//     label: 'Juarez Autonomous University of Tabasco (Mexico)'
//   },
//   {
//     value: '001VS00000GDjViYAL',
//     label: 'Juarez University of the State of Durango (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV9YAL',
//     label: 'Meritorious Autonomous University of Puebla (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVaYAL',
//     label: 'Metropolitan Autonomous University (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVjYAL',
//     label: 'Michoacan University of San Nicolas de Hidalgo (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV1YAL',
//     label: 'Minatitlán Institute of Technology (ITM) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUSYA1',
//     label: 'National Autonomous University of Mexico'
//   },
//   {
//     value: '001VS00000GDjUMYA1',
//     label: 'National Pedagogical University (Mexico)'
//   },
//   {
//     value: '0013g00000aNInnAAG',
//     label: 'National Polytechnic Institute (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUOYA1',
//     label: 'National Technological Institute of Mexico'
//   },
//   {
//     value: '001VS00000GDjURYA1',
//     label: 'Open and Distance University of Mexico'
//   },
//   {
//     value: '001VS00000GDjVlYAL',
//     label: 'Popular Autonomous University of Veracruz (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV3YAL',
//     label: 'Poza Rica Higher Technological Institute (ITSPR) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUkYAL',
//     label: 'Puebla Institute of Technology (ITO) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV4YAL',
//     label: 'Puerto Penasco Higher Technological Institute (ITSPP) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUnYAL',
//     label: 'Sonora Institute of Technology (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV6YAL',
//     label: 'Southern Guanajuato Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUTYA1',
//     label: 'Technological Institute of Acapulco (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUjYAL',
//     label: 'Technological Institute of Arteaga Pavilion (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUYYA1',
//     label: 'Technological Institute of Chihuahua II (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUXYA1',
//     label: 'Technological Institute of Chihuahua (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUZYA1',
//     label: 'Technological Institute of Ciudad Juarez (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUaYAL',
//     label: 'Technological Institute of Ciudad Madero (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV2YAL',
//     label: 'Technological Institute of Coatzacoalcos (ITESCO) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUbYAL',
//     label: 'Technological Institute of Culiacan (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUdYAL',
//     label: 'Technological Institute of Ensenada (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUfYAL',
//     label: 'Technological Institute of La Paz (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUgYAL',
//     label: 'Technological Institute of Mexicali (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUhYAL',
//     label: 'Technological Institute of Morelia (ITM) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUiYAL',
//     label: 'Technological Institute of Oaxaca (ITO) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUlYAL',
//     label: 'Technological Institute of Querétaro (ITQ) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUmYAL',
//     label: 'Technological Institute of Saltillo (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUoYAL',
//     label: 'Technological Institute of Tepic (ITT) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUtYAL',
//     label: 'Technological Institute of the Valley of Oaxaca (ITVO) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUqYAL',
//     label: 'Technological Institute of Toluca (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUrYAL',
//     label: 'Technological Institute of Tuxtepec (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUsYAL',
//     label: 'Technological Institute of Tuxtla Gutierrez (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUuYAL',
//     label: 'Technological Institute of Veracruz (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV5YAL',
//     label: 'Technological Institute of Zacapoaxtla (ITSZ) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUwYAL',
//     label: 'Technological Institute of Zacatepec (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUpYAL',
//     label: 'Tijuana Institute of Technology (ITT) (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVcYAL',
//     label: 'University of Colima (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVdYAL',
//     label: 'University of Guadalajara (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVeYAL',
//     label: 'University of Guanajuato (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVfYAL',
//     label: 'University of Quintana Roo (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVbYAL',
//     label: 'University of Sciences and Arts of Chiapas (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVgYAL',
//     label: 'University of Sonora (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVkYAL',
//     label: 'Veracruz University (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUvYAL',
//     label: 'Villahermosa Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV7YAL',
//     label: 'Western Zacatecas Higher Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000GDjV8YAL',
//     label: 'Zapopan Higher Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000Jnv77YAB',
//     label: 'Unlisted Domestic'
//   }
// ];

// const newArray = [
//   {
//     value: '001VS00000KE52lYAD',
//     label: 'Aeronautical University of Queretaro (Mexico)'
//   },
//   {
//     value: '001VS00000KE52mYAD',
//     label: 'Altamira Technological University (Mexico)'
//   },
//   {
//     value: '001VS00000KEFDNYA5',
//     label: 'Anahuac University (Mexico)'
//   },
//   {
//     value: '001VS00000KEFDOYA5',
//     label: 'Anahuac University Mexico North (Mexico)'
//   },
//   {
//     value: '001VS00000KEEveYAH',
//     label: 'Anahuac University Queretaro (Mexico)'
//   },
//   {
//     value: '001VS00000KEEvfYAH',
//     label: 'Arkansas State University, Queretaro Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEDoIYAX',
//     label: 'Autonomous Metropolitan University Azcapotzalco (Mexico)'
//   },
//   {
//     value: '001VS00000KEDoJYAX',
//     label: 'Autonomous Technology Institute of Mexico (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVBYA1',
//     label: 'Autonomous University of Aguascalientes (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVWYA1',
//     label: 'Autonomous University of Carmen (Mexico)'
//   },
//   {
//     value: '001VS00000KEF3lYAH',
//     label: 'Autonomous University of Guadalajara (Mexico)'
//   },
//   {
//     value: '001VS00000KEF3mYAH',
//     label: 'Autonomous University of Queretaro (Mexico)'
//   },
//   {
//     value: '001VS00000KEFGbYAP',
//     label: 'Benemerita Autonomous University of Puebla (Mexico)'
//   },
//   {
//     value: '001VS00000GDjUQYA1',
//     label: 'Chapingo Autonomous University (Mexico)'
//   },
//   {
//     value: '001VS00000KECDuYAP',
//     label: 'Cuauhtemoc University (Mexico)'
//   },
//   {
//     value: '001VS00000KECDvYAP',
//     label: 'Fidel Velazquez Technological University (Mexico)'
//   },
//   {
//     value: '001VS00000KECiaYAH',
//     label: 'Ibero-American University, Mexico City (Mexico)'
//   },
//   {
//     value: '001VS00000KECiZYAX',
//     label: 'Ibero-American University Puebla (Mexico)'
//   },
//   {
//     value: '001VS00000KEAbxYAH',
//     label: 'Institute of Technology and Higher Studies of Monterrey (Mexico)'
//   },
//   {
//     value: '001VS00000KEAbyYAH',
//     label: 'Insurgentes University (Mexico)'
//   },
//   {
//     value: '001VS00000KE94kYAD',
//     label: 'Jalisco Higher Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KE7O1YAL',
//     label: 'Laguna Durango Technological University (Mexico)'
//   },
//   {
//     value: '001VS00000KE94lYAD',
//     label: 'La Laguna Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KEFIDYA5',
//     label: 'La Piedad Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KEFIEYA5',
//     label: 'La Salle Bajio University (Mexico)'
//   },
//   {
//     value: '001VS00000KE7O0YAL',
//     label: 'La Salle Northwest University (Mexico)'
//   },
//   {
//     value: '001VS00000KEFJpYAP',
//     label: 'Lerdo Higher Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KEFJqYAP',
//     label: 'Metropolitan Technological University (Mexico)'
//   },
//   {
//     value: '001VS00000KEAs4YAH',
//     label: 'Mexico State University, Toluca de Lerdo (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVjYAL',
//     label: 'Michoacan University of San Nicolas de Hidalgo (Mexico)'
//   },
//   {
//     value: '001VS00000KEFLRYA5',
//     label: 'Minatitlan Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KEBD2YAP',
//     label: 'Monterrey Institute of Technology, Cuernavaca Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEFLSYA5',
//     label: 'Monterrey Institute of Technology - Mexico City Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEE4QYAX',
//     label: 'Monterrey Institute of Technology - Monterrey Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEE4RYAX',
//     label: 'Monterrey Institute of Technology - Queretaro (Mexico)'
//   },
//   {
//     value: '001VS00000KEBD3YAP',
//     label: 'Monterrey Institute of Technology, Sonora Norte Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEFN3YAP',
//     label: 'Morelia Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KEFN4YAP',
//     label: 'National Institute of Mexico, Colima Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEDpuYAH',
//     label: 'National Polytechnic Institute Engineering (Mexico)'
//   },
//   {
//     value: '001VS00000KEDpvYAH',
//     label: 'National Technological Institute of Mexico, San Juan del Río Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEBg6YAH',
//     label: 'National Technological Institute of Mexico, San Marcos Engineer Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEBg7YAH',
//     label: 'Piedras Negras, Coahuila Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KECDwYAP',
//     label: 'Polytechnic University of Chiapas (Mexico)'
//   },
//   {
//     value: '001VS00000KECDxYAP',
//     label: 'Polytechnic University of Durango (Mexico)'
//   },
//   {
//     value: '001VS00000KEEnaYAH',
//     label: 'Polytechnic University of Metropolitan Hidalgo (Mexico)'
//   },
//   {
//     value: '001VS00000KEEnbYAH',
//     label: 'Polytechnic University of Morelos State (Mexico)'
//   },
//   {
//     value: '001VS00000KEDwMYAX',
//     label: 'Polytechnic University of Pachuca (Mexico)'
//   },
//   {
//     value: '001VS00000KEDwNYAX',
//     label: 'Polytechnic University of Queretaro (Mexico)'
//   },
//   {
//     value: '001VS00000KEDd0YAH',
//     label: 'Polytechnic University of Quintana Roo (Mexico)'
//   },
//   {
//     value: '001VS00000KEDd1YAH',
//     label: 'Polytechnic University of Sinaloa (Mexico)'
//   },
//   {
//     value: '001VS00000KEBHrYAP',
//     label: 'Polytechnic University of Tapachula (Mexico)'
//   },
//   {
//     value: '001VS00000KEBHsYAP',
//     label: 'Polytechnic University of the State of Guerrero (Mexico)'
//   },
//   {
//     value: '001VS00000KE8BuYAL',
//     label: 'Polytechnic University of the Valley of Mexico (Mexico)'
//   },
//   {
//     value: '001VS00000KE8BvYAL',
//     label: 'Polytechnic University of Victoria (Mexico)'
//   },
//   {
//     value: '001VS00000KE9O8YAL',
//     label: 'Private University of the State of Mexico (Mexico)'
//   },
//   {
//     value: '001VS00000KE9O9YAL',
//     label: 'Professional Interdisciplinary Engineering School (Mexico)'
//   },
//   {
//     value: '001VS00000KEESeYAP',
//     label: 'Puebla Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KEESfYAP',
//     label: 'Puebla Technological University (Mexico)'
//   },
//   {
//     value: '001VS00000KE3NfYAL',
//     label: 'Sabes University (Mexico)'
//   },
//   {
//     value: '001VS00000KE3NgYAL',
//     label: 'San Luis Potosí Polytechnic University (Mexico)'
//   },
//   {
//     value: '001VS00000KEFOfYAP',
//     label: 'Technological Institute of Mexico, Tapachula Campus (Mexico)'
//   },
//   {
//     value: '001VS00000KEFOgYAP',
//     label: 'Technological University of Northern Coahuila (Mexico)'
//   },
//   {
//     value: '001VS00000KEAvHYAX',
//     label: 'Tijuana Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000KEAvIYAX',
//     label: 'Toluca Technological Institute (Mexico)'
//   },
//   {
//     value: '001VS00000GDjVeYAL',
//     label: 'University of Guanajuato (Mexico)'
//   },
//   {
//     value: '001VS00000KEFQIYA5',
//     label: 'University of Matamoros (Mexico)'
//   },
//   {
//     value: '001VS00000KEEfYYAX',
//     label: 'University of Monterrey (Mexico)'
//   },
//   {
//     value: '001VS00000KEEfZYAX',
//     label: 'University of Morelia (Mexico)'
//   },
// ];

// const getUniqueObjects = (oldArray, newArray) => {
//   const existingValues = new Set(oldArray.map(item => item.value));
//   const existingLabels = new Set(oldArray.map(item => item.label));

//   return newArray.filter(item => {
//       return !existingValues.has(item.value) && !existingLabels.has(item.label);
//   });
// };

// const uniqueFromNewArray = getUniqueObjects(existingArray, newArray);

// console.log(uniqueFromNewArray);

const fs = require('fs');
let finalArray = [
  {
    value: '001VS00000GDjUUYA1',
    label: 'Aguascalientes Institute of Technology (Mexico)'
  },
  {
    value: '001VS00000GDjUPYA1',
    label: 'Antonio Narro Agrarian Autonomous University (Mexico)'
  },
  {
    value: '001VS00000GDjVBYA1',
    label: 'Autonomous University of Aguascalientes (Mexico)'
  },
  {
    value: '001VS00000GDjVCYA1',
    label: 'Autonomous University of Baja California (Mexico)'
  },
  {
    value: '001VS00000GDjVDYA1',
    label: 'Autonomous University of Baja California Sur (Mexico)'
  },
  {
    value: '001VS00000GDjVEYA1',
    label: 'Autonomous University of Campeche (Mexico)'
  },
  {
    value: '001VS00000GDjVWYA1',
    label: 'Autonomous University of Carmen (Mexico)'
  },
  {
    value: '001VS00000GDjVFYA1',
    label: 'Autonomous University of Chiapas (Mexico)'
  },
  {
    value: '001VS00000GDjVGYA1',
    label: 'Autonomous University of Chihuahua (Mexico)'
  },
  {
    value: '001VS00000GDjVHYA1',
    label: 'Autonomous University of Ciudad Juarez (Mexico)'
  },
  {
    value: '001VS00000GDjVJYA1',
    label: 'Autonomous University of Coahuila (Mexico)'
  },
  {
    value: '001VS00000GDjVKYA1',
    label: 'Autonomous University of Durango (Mexico)'
  },
  {
    value: '001VS00000GDjVLYA1',
    label: 'Autonomous University of Guerrero (Mexico)'
  },
  {
    value: '001VS00000GDjVIYA1',
    label: 'Autonomous University of Mexico City (Mexico)'
  },
  {
    value: '001VS00000GDjVMYA1',
    label: 'Autonomous University of Nayarit (Mexico)'
  },
  {
    value: '001VS00000GDjVNYA1',
    label: 'Autonomous University of Nuevo Leon (Mexico)'
  },
  {
    value: '001VS00000GDjVPYA1',
    label: 'Autonomous University of Querétaro (Mexico)'
  },
  {
    value: '001VS00000GDjVQYA1',
    label: 'Autonomous University of San Luis Potosi (Mexico)'
  },
  {
    value: '001VS00000GDjVRYA1',
    label: 'Autonomous University of Sinaloa (Mexico)'
  },
  {
    value: '001VS00000GDjVSYA1',
    label: 'Autonomous University of Tamaulipas (Mexico)'
  },
  {
    value: '001VS00000GDjVXYA1',
    label: 'Autonomous University of the State of Hidalgo (Mexico)'
  },
  {
    value: '001VS00000GDjVYYA1',
    label: 'Autonomous University of the State of Mexico'
  },
  {
    value: '001VS00000GDjVZYA1',
    label: 'Autonomous University of the State of Morelos (Mexico)'
  },
  {
    value: '001VS00000GDjVOYA1',
    label: 'Autonomous University of the West (Mexico)'
  },
  {
    value: '001VS00000GDjVTYA1',
    label: 'Autonomous University of Tlaxcala (Mexico)'
  },
  {
    value: '001VS00000GDjVUYA1',
    label: 'Autonomous University of Yucatan (Mexico)'
  },
  {
    value: '001VS00000GDjVVYA1',
    label: 'Autonomous University of Zacatecas (Mexico)'
  },
  {
    value: '001VS00000GDjVAYA1',
    label: 'Benito Juarez Autonomous University of Oaxaca (Mexico)'
  },
  {
    value: '001VS00000GDjUVYA1',
    label: 'Celaya Technological Institute (Mexico)'
  },
  {
    value: '001VS00000GDjUQYA1',
    label: 'Chapingo Autonomous University (Mexico)'
  },
  {
    value: '001VS00000GDjUWYA1',
    label: 'Chetumal Technological Institute (ITCH) (Mexico)'
  },
  {
    value: '001VS00000GDjUcYAL',
    label: 'Durango Institute of Technology (Mexico)'
  },
  {
    value: '001VS00000GDjUxYAL',
    label: 'El Llano Technological Institute (ITLLANO) (Mexico)'
  },
  {
    value: '001VS00000GDjULYA1',
    label: 'General Coordination of Technological and Polytechnic Universities (CGUT) (Mexico)'
  },
  {
    value: '001VS00000GDjUeYAL',
    label: 'Hermosillo Technological Institute (Mexico)'
  },
  {
    value: '001VS00000GDjUyYAL',
    label: 'Higher Technological Institute of Acayucan (Mexico)'
  },
  {
    value: '001VS00000GDjUzYAL',
    label: 'Higher Technological Institute of Cajeme (Mexico)'
  },
  {
    value: '001VS00000GDjV0YAL',
    label: 'Higher Technological Institute of Ciudad Constitución (ITSCC) (Mexico)'
  },
  {
    value: '001VS00000GDjVhYAL',
    label: 'Juarez Autonomous University of Tabasco (Mexico)'
  },
  {
    value: '001VS00000GDjViYAL',
    label: 'Juarez University of the State of Durango (Mexico)'
  },
  {
    value: '001VS00000GDjV9YAL',
    label: 'Meritorious Autonomous University of Puebla (Mexico)'
  },
  {
    value: '001VS00000GDjVaYAL',
    label: 'Metropolitan Autonomous University (Mexico)'
  },
  {
    value: '001VS00000GDjVjYAL',
    label: 'Michoacan University of San Nicolas de Hidalgo (Mexico)'
  },
  {
    value: '001VS00000GDjV1YAL',
    label: 'Minatitlán Institute of Technology (ITM) (Mexico)'
  },
  {
    value: '001VS00000GDjUSYA1',
    label: 'National Autonomous University of Mexico'
  },
  {
    value: '001VS00000GDjUMYA1',
    label: 'National Pedagogical University (Mexico)'
  },
  {
    value: '0013g00000aNInnAAG',
    label: 'National Polytechnic Institute (Mexico)'
  },
  {
    value: '001VS00000GDjUOYA1',
    label: 'National Technological Institute of Mexico'
  },
  {
    value: '001VS00000GDjURYA1',
    label: 'Open and Distance University of Mexico'
  },
  {
    value: '001VS00000GDjVlYAL',
    label: 'Popular Autonomous University of Veracruz (Mexico)'
  },
  {
    value: '001VS00000GDjV3YAL',
    label: 'Poza Rica Higher Technological Institute (ITSPR) (Mexico)'
  },
  {
    value: '001VS00000GDjUkYAL',
    label: 'Puebla Institute of Technology (ITO) (Mexico)'
  },
  {
    value: '001VS00000GDjV4YAL',
    label: 'Puerto Penasco Higher Technological Institute (ITSPP) (Mexico)'
  },
  {
    value: '001VS00000GDjUnYAL',
    label: 'Sonora Institute of Technology (Mexico)'
  },
  {
    value: '001VS00000GDjV6YAL',
    label: 'Southern Guanajuato Technological Institute (Mexico)'
  },
  {
    value: '001VS00000GDjUTYA1',
    label: 'Technological Institute of Acapulco (Mexico)'
  },
  {
    value: '001VS00000GDjUjYAL',
    label: 'Technological Institute of Arteaga Pavilion (Mexico)'
  },
  {
    value: '001VS00000GDjUYYA1',
    label: 'Technological Institute of Chihuahua II (Mexico)'
  },
  {
    value: '001VS00000GDjUXYA1',
    label: 'Technological Institute of Chihuahua (Mexico)'
  },
  {
    value: '001VS00000GDjUZYA1',
    label: 'Technological Institute of Ciudad Juarez (Mexico)'
  },
  {
    value: '001VS00000GDjUaYAL',
    label: 'Technological Institute of Ciudad Madero (Mexico)'
  },
  {
    value: '001VS00000GDjV2YAL',
    label: 'Technological Institute of Coatzacoalcos (ITESCO) (Mexico)'
  },
  {
    value: '001VS00000GDjUbYAL',
    label: 'Technological Institute of Culiacan (Mexico)'
  },
  {
    value: '001VS00000GDjUdYAL',
    label: 'Technological Institute of Ensenada (Mexico)'
  },
  {
    value: '001VS00000GDjUfYAL',
    label: 'Technological Institute of La Paz (Mexico)'
  },
  {
    value: '001VS00000GDjUgYAL',
    label: 'Technological Institute of Mexicali (Mexico)'
  },
  {
    value: '001VS00000GDjUhYAL',
    label: 'Technological Institute of Morelia (ITM) (Mexico)'
  },
  {
    value: '001VS00000GDjUiYAL',
    label: 'Technological Institute of Oaxaca (ITO) (Mexico)'
  },
  {
    value: '001VS00000GDjUlYAL',
    label: 'Technological Institute of Querétaro (ITQ) (Mexico)'
  },
  {
    value: '001VS00000GDjUmYAL',
    label: 'Technological Institute of Saltillo (Mexico)'
  },
  {
    value: '001VS00000GDjUoYAL',
    label: 'Technological Institute of Tepic (ITT) (Mexico)'
  },
  {
    value: '001VS00000GDjUtYAL',
    label: 'Technological Institute of the Valley of Oaxaca (ITVO) (Mexico)'
  },
  {
    value: '001VS00000GDjUqYAL',
    label: 'Technological Institute of Toluca (Mexico)'
  },
  {
    value: '001VS00000GDjUrYAL',
    label: 'Technological Institute of Tuxtepec (Mexico)'
  },
  {
    value: '001VS00000GDjUsYAL',
    label: 'Technological Institute of Tuxtla Gutierrez (Mexico)'
  },
  {
    value: '001VS00000GDjUuYAL',
    label: 'Technological Institute of Veracruz (Mexico)'
  },
  {
    value: '001VS00000GDjV5YAL',
    label: 'Technological Institute of Zacapoaxtla (ITSZ) (Mexico)'
  },
  {
    value: '001VS00000GDjUwYAL',
    label: 'Technological Institute of Zacatepec (Mexico)'
  },
  {
    value: '001VS00000GDjUpYAL',
    label: 'Tijuana Institute of Technology (ITT) (Mexico)'
  },
  {
    value: '001VS00000GDjVcYAL',
    label: 'University of Colima (Mexico)'
  },
  {
    value: '001VS00000GDjVdYAL',
    label: 'University of Guadalajara (Mexico)'
  },
  {
    value: '001VS00000GDjVeYAL',
    label: 'University of Guanajuato (Mexico)'
  },
  {
    value: '001VS00000GDjVfYAL',
    label: 'University of Quintana Roo (Mexico)'
  },
  {
    value: '001VS00000GDjVbYAL',
    label: 'University of Sciences and Arts of Chiapas (Mexico)'
  },
  {
    value: '001VS00000GDjVgYAL',
    label: 'University of Sonora (Mexico)'
  },
  {
    value: '001VS00000GDjVkYAL',
    label: 'Veracruz University (Mexico)'
  },
  {
    value: '001VS00000GDjUvYAL',
    label: 'Villahermosa Technological Institute (Mexico)'
  },
  {
    value: '001VS00000GDjV7YAL',
    label: 'Western Zacatecas Higher Technological Institute (Mexico)'
  },
  {
    value: '001VS00000GDjV8YAL',
    label: 'Zapopan Higher Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KE52lYAD',
    label: 'Aeronautical University of Queretaro (Mexico)'
  },
  {
    value: '001VS00000KE52mYAD',
    label: 'Altamira Technological University (Mexico)'
  },
  {
    value: '001VS00000KEFDNYA5',
    label: 'Anahuac University (Mexico)'
  },
  {
    value: '001VS00000KEFDOYA5',
    label: 'Anahuac University Mexico North (Mexico)'
  },
  {
    value: '001VS00000KEEveYAH',
    label: 'Anahuac University Queretaro (Mexico)'
  },
  {
    value: '001VS00000KEEvfYAH',
    label: 'Arkansas State University, Queretaro Campus (Mexico)'
  },
  {
    value: '001VS00000KEDoIYAX',
    label: 'Autonomous Metropolitan University Azcapotzalco (Mexico)'
  },
  {
    value: '001VS00000KEDoJYAX',
    label: 'Autonomous Technology Institute of Mexico (Mexico)'
  },
  {
    value: '001VS00000KEF3lYAH',
    label: 'Autonomous University of Guadalajara (Mexico)'
  },
  {
    value: '001VS00000KEF3mYAH',
    label: 'Autonomous University of Queretaro (Mexico)'
  },
  {
    value: '001VS00000KEFGbYAP',
    label: 'Benemerita Autonomous University of Puebla (Mexico)'
  },
  {
    value: '001VS00000KECDuYAP',
    label: 'Cuauhtemoc University (Mexico)'
  },
  {
    value: '001VS00000KECDvYAP',
    label: 'Fidel Velazquez Technological University (Mexico)'
  },
  {
    value: '001VS00000KECiaYAH',
    label: 'Ibero-American University, Mexico City (Mexico)'
  },
  {
    value: '001VS00000KECiZYAX',
    label: 'Ibero-American University Puebla (Mexico)'
  },
  {
    value: '001VS00000KEAbxYAH',
    label: 'Institute of Technology and Higher Studies of Monterrey (Mexico)'
  },
  {
    value: '001VS00000KEAbyYAH',
    label: 'Insurgentes University (Mexico)'
  },
  {
    value: '001VS00000KE94kYAD',
    label: 'Jalisco Higher Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KE7O1YAL',
    label: 'Laguna Durango Technological University (Mexico)'
  },
  {
    value: '001VS00000KE94lYAD',
    label: 'La Laguna Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEFIDYA5',
    label: 'La Piedad Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEFIEYA5',
    label: 'La Salle Bajio University (Mexico)'
  },
  {
    value: '001VS00000KE7O0YAL',
    label: 'La Salle Northwest University (Mexico)'
  },
  {
    value: '001VS00000KEFJpYAP',
    label: 'Lerdo Higher Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEFJqYAP',
    label: 'Metropolitan Technological University (Mexico)'
  },
  {
    value: '001VS00000KEAs4YAH',
    label: 'Mexico State University, Toluca de Lerdo (Mexico)'
  },
  {
    value: '001VS00000KEFLRYA5',
    label: 'Minatitlan Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEBD2YAP',
    label: 'Monterrey Institute of Technology, Cuernavaca Campus (Mexico)'
  },
  {
    value: '001VS00000KEFLSYA5',
    label: 'Monterrey Institute of Technology - Mexico City Campus (Mexico)'
  },
  {
    value: '001VS00000KEE4QYAX',
    label: 'Monterrey Institute of Technology - Monterrey Campus (Mexico)'
  },
  {
    value: '001VS00000KEE4RYAX',
    label: 'Monterrey Institute of Technology - Queretaro (Mexico)'
  },
  {
    value: '001VS00000KEBD3YAP',
    label: 'Monterrey Institute of Technology, Sonora Norte Campus (Mexico)'
  },
  {
    value: '001VS00000KEFN3YAP',
    label: 'Morelia Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEFN4YAP',
    label: 'National Institute of Mexico, Colima Campus (Mexico)'
  },
  {
    value: '001VS00000KEDpuYAH',
    label: 'National Polytechnic Institute Engineering (Mexico)'
  },
  {
    value: '001VS00000KEDpvYAH',
    label: 'National Technological Institute of Mexico, San Juan del Río Campus (Mexico)'
  },
  {
    value: '001VS00000KEBg6YAH',
    label: 'National Technological Institute of Mexico, San Marcos Engineer Campus (Mexico)'
  },
  {
    value: '001VS00000KEBg7YAH',
    label: 'Piedras Negras, Coahuila Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KECDwYAP',
    label: 'Polytechnic University of Chiapas (Mexico)'
  },
  {
    value: '001VS00000KECDxYAP',
    label: 'Polytechnic University of Durango (Mexico)'
  },
  {
    value: '001VS00000KEEnaYAH',
    label: 'Polytechnic University of Metropolitan Hidalgo (Mexico)'
  },
  {
    value: '001VS00000KEEnbYAH',
    label: 'Polytechnic University of Morelos State (Mexico)'
  },
  {
    value: '001VS00000KEDwMYAX',
    label: 'Polytechnic University of Pachuca (Mexico)'
  },
  {
    value: '001VS00000KEDwNYAX',
    label: 'Polytechnic University of Queretaro (Mexico)'
  },
  {
    value: '001VS00000KEDd0YAH',
    label: 'Polytechnic University of Quintana Roo (Mexico)'
  },
  {
    value: '001VS00000KEDd1YAH',
    label: 'Polytechnic University of Sinaloa (Mexico)'
  },
  {
    value: '001VS00000KEBHrYAP',
    label: 'Polytechnic University of Tapachula (Mexico)'
  },
  {
    value: '001VS00000KEBHsYAP',
    label: 'Polytechnic University of the State of Guerrero (Mexico)'
  },
  {
    value: '001VS00000KE8BuYAL',
    label: 'Polytechnic University of the Valley of Mexico (Mexico)'
  },
  {
    value: '001VS00000KE8BvYAL',
    label: 'Polytechnic University of Victoria (Mexico)'
  },
  {
    value: '001VS00000KE9O8YAL',
    label: 'Private University of the State of Mexico (Mexico)'
  },
  {
    value: '001VS00000KE9O9YAL',
    label: 'Professional Interdisciplinary Engineering School (Mexico)'
  },
  {
    value: '001VS00000KEESeYAP',
    label: 'Puebla Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEESfYAP',
    label: 'Puebla Technological University (Mexico)'
  },
  {
    value: '001VS00000KE3NfYAL',
    label: 'Sabes University (Mexico)'
  },
  {
    value: '001VS00000KE3NgYAL',
    label: 'San Luis Potosí Polytechnic University (Mexico)'
  },
  {
    value: '001VS00000KEFOfYAP',
    label: 'Technological Institute of Mexico, Tapachula Campus (Mexico)'
  },
  {
    value: '001VS00000KEFOgYAP',
    label: 'Technological University of Northern Coahuila (Mexico)'
  },
  {
    value: '001VS00000KEAvHYAX',
    label: 'Tijuana Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEAvIYAX',
    label: 'Toluca Technological Institute (Mexico)'
  },
  {
    value: '001VS00000KEFQIYA5',
    label: 'University of Matamoros (Mexico)'
  },
  {
    value: '001VS00000KEEfYYAX',
    label: 'University of Monterrey (Mexico)'
  },
  {
    value: '001VS00000KEEfZYAX',
    label: 'University of Morelia (Mexico)'
  },
  {
    value: '001VS00000Jnv77YAB',
    label: 'Unlisted Domestic'
  }
]
const sortedArray = finalArray.sort((a, b) => {
  const labelA = a.label.toLowerCase(); // Convert to lowercase for case-insensitive sorting
  const labelB = b.label.toLowerCase();

  if (labelA < labelB) return -1; // `a` comes before `b`
  if (labelA > labelB) return 1;  // `b` comes before `a`
  return 0;                       // No change in order
});

console.log(sortedArray);
const output = JSON.stringify(sortedArray, null, 2);
fs.writeFile('sortedArray.json', output, 'utf8', (err) => {
  if (err) {
      console.error('Error writing to file:', err);
  } else {
      console.log('Array successfully written to sortedArray.json');
  }
});