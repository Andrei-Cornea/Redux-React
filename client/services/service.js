const CarMarketService = httpProvider => {
    const api = 'http://api.edmunds.com/api/vehicle/v2'
    let marketData = { }; marketData.models = [ ]; marketData.name = [ ];
    return {
        getMarketCars: ( ) => httpProvider( 'GET', `${ api }/makes?fmt=json&api_key=e6jd7d4rx7qx64r5dskzwdwc` )
          .then( function( response ) {
              var id = 0;
              response.makes.forEach( function( entry ) {
                  marketData.name.push(entry.name);
                  entry.models.forEach( function( model ) {
                      marketData.models.push ( {
                          id: id++,
                          name: model.name,
                          make: entry.name,
                          isSelected: false
                      } );
                  } );
              } )
              console.log("sdfwero", marketData);
              return marketData;
          } )
    }
}

export {CarMarketService};
