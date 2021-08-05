import axios, { AxiosInstance } from "axios";

interface iPokemon{
    id: number
    name: string
    abilities: Array<string>
    height: number
    weight: number
    types: Array<iPokeType>
    image: string
}
interface iPokeType{
    name: string;
    hexColor: string
}

class Pokemon{
    public api : AxiosInstance;
    public pokeId : number;
    public POKEMON_INDEX : number;
    public pokeType : Array<iPokeType>;

    constructor(){
      this.api = axios.create({
            baseURL: "https://pokeapi.co/api/v2"
        });
      this.POKEMON_INDEX = 1118;
      this.pokeId = 0;
      this.pokeType = [
        {
            name:"Bug",
            hexColor:"94BC4A"
        },{
            name:"Dark",
            hexColor:"736C75"
        },{
            name:"Dragon",
            hexColor:"6A7BAF"
        },{
            name:"Electric",
            hexColor:"E5C531"
        },{
            name:"Fairy",
            hexColor:"E397D1"
        },{
            name:"Fighting",
            hexColor:"CB5F48"
        },{
            name:"Fire",
            hexColor:"EA7A3C"
        },{
            name:"Flying",
            hexColor:"7DA6DE"
        },{
            name:"Ghost",
            hexColor:"846AB6"
        },{
            name:"Grass",
            hexColor:"71C558"
        },{
            name:"Ground",
            hexColor:"CC9F4F"
        },{
            name:"Ice",
            hexColor:"70CBD4"
        },{
            name:"Normal",
            hexColor:"AAB09F"
        },{
            name:"Poison",
            hexColor:"B468B7"
        },{
            name:"Psychic",
            hexColor:"E5709B"
        },{
            name:"Rock",
            hexColor:"B2A061"
        },{
            name:"Steel",
            hexColor:"89A1B0"
        },{
            name:"Water",
            hexColor:"539AE2"
        }
      ]
      this.getPokeId()
    }
    async getRandPokemon(){
      return await this.api.get(`/pokemon/${this.pokeId}`)
        .then((response: any)=>{
          //$.abilities[*].ability.name
                const poke : iPokemon = {
                    id: this.pokeId,
                    name: response.data.name,
                    abilities: this.getAbilities(response.data.abilities),
                    height: response.data.height,
                    weight: response.data.weight,
                    types: this.getType(response.data.types),
                    image: response.data.sprites.front_default,
                }
            return poke
        })
        .catch((err: any)=>{
            throw new Error(err)
        })
    }
    async getPokemon(id: number){
        return await this.api.get(`/pokemon/${id}`)
          .then((response: any)=>{
            //$.abilities[*].ability.name
                  const poke : iPokemon = {
                      id: this.pokeId,
                      name: response.data.name,
                      abilities: this.getAbilities(response.data.abilities),
                      height: response.data.height,
                      weight: response.data.weight,
                      types: this.getType(response.data.types),
                      image: response.data.sprites.front_default,
                  }
              return poke
          })
          .catch((err: any)=>{
              throw new Error(err)
          })
      }
      
    getPokeId() : void{
        const pokeId = Math.floor((Math.random()* this.POKEMON_INDEX)+1)
        if(pokeId <= 898 || pokeId >= 10001){
            this.pokeId = pokeId
        } else {
            this.getPokeId()
        }
    }
    getAbilities(abilities: Array<any>) : Array<string>{
        let renderedAbilities : Array<string> = []
        abilities.forEach(ability=>{
            renderedAbilities.push(ability.ability.name);
        })
        return renderedAbilities;
    }
    getType(types: Array<any>) : Array<iPokeType> {
        let renderedType : Array<iPokeType> = []
        types.forEach(type=>{
            this.pokeType.map(poke=>{
                if(type.type.name === poke.name.toLowerCase()){
                    renderedType.push(poke)
                }
            })
        })
        return renderedType;
    }
}

