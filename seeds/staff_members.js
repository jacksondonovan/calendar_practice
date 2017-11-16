
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('service_staff').del()
    .then(function () {
      return knex('service_staff').insert([
        {
          id: 1,
          first_name: 'Colette',
          last_name: 'Abedie',
          phone: '802-111-2222',
          employed_by: 'Vermont Flannel',
          account_number: '12345'
        },
        {
          id: 2,
          first_name: 'Pat',
          last_name: 'Wolfpatz',
          phone: '231-456-3456',
          employed_by: 'Vermont Flannel',
          account_number: '32411'
        },
        {
          id: 3,
          first_name: 'Jackson',
          last_name: 'Donovan',
          phone: '802-477-3986',
          employed_by: 'Vermont Flannel',
          account_number: '89898'
        },
      ]);
    });
};
