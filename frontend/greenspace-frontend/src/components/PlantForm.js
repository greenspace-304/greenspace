import React from 'react';
import './PlantForm.css';

export class PlantForm extends React.Component {
    state = {
        commonName: '',
        scientificName: '',
        description: '',
        category: '',
        growthType: '',
        barkTexture: '',
        barColor: '',
        barkThickness: '',
        flowerColor: '',
        petalNumber: '',
        leafColor: '',
        leafShape: '',
        leafArrangement: '',
        hasThorns: false,
        fruitType: '',
        fruitColor: '',
        floweringSeason: ''
    }

    componentDidMount() {
        
    }

    changeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            commonName: '',
            scientificName: '',
            description: '',
            category: '',
            growthType: '',
            barkTexture: '',
            barColor: '',
            barkThickness: '',
            flowerColor: '',
            petalNumber: '',
            leafColor: '',
            leafShape: '',
            leafArrangement: '',
            hasThorns: false,
            fruitType: '',
            fruitColor: '',
            floweringSeason: ''
        });
    }

    render() {
        return (
            <div class="popContainer">
                <div class="popContent">
                <h4 class="title">Plant Form</h4>
                    <div class="temp">
                        <form class="form">
                            <div class="name text">
                                <p>Common Name</p>
                                <input
                                    name="commonName"
                                    type="text"
                                    value={this.state.commonName}
                                    onChange={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="scientificName text">
                                <p>Scientific Name</p>
                                <input
                                    name="scientificName"
                                    type="text"
                                    value={this.state.scientificName}
                                    onChange={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="description">
                                <p>Description</p>
                                <textarea
                                    name="description"
                                    value={this.state.description}
                                    onChange={e => this.changeValue(e)}>
                                </textarea>
                            </div>
                            <div class="category">
                                <p>Category</p>
                                <input
                                    name="category"
                                    type="radio"
                                    value="Tree"
                                    onClick={e => this.changeValue(e)}
                                />  Tree<br></br>
                                <input
                                    name="category"
                                    type="radio"
                                    value="Shrub"
                                    onClick={e => this.changeValue(e)}
                                />  Shrub<br></br>
                                <input
                                    name="category"
                                    type="radio"
                                    value="Fern"
                                    onClick={e => this.changeValue(e)}
                                />  Fern<br></br>
                                <input
                                    name="category"
                                    type="radio"
                                    value="Herb"
                                    onClick={e => this.changeValue(e)}
                                />  Herb<br></br>
                            </div>
                            <div class="growthType">
                                <p>Growth Type</p>
                                <input
                                    name="growthType"
                                    type="radio"
                                    value="Perennial"
                                    onClick={e => this.changeValue(e)}
                                />  Perennial<br></br>
                                <input
                                    name="growthType"
                                    type="radio"
                                    value="Annual"
                                    onClick={e => this.changeValue(e)}
                                />  Annual<br></br>
                                <input
                                    name="growthType"
                                    type="radio"
                                    value="Biennial"
                                    onClick={e => this.changeValue(e)}
                                />  Biennial<br></br>
                            </div>
                            <div class="barkTexture">
                                <p>Bark Texture</p>
                                <input
                                    name="barkTexture"
                                    type="radio"
                                    value="Smooth"
                                    onClick={e => this.changeValue(e)}
                                />  Smooth<br></br>
                                <input
                                    name="barkTexture"
                                    type="radio"
                                    value="Rough"
                                    onClick={e => this.changeValue(e)}
                                />  Rough<br></br>
                                <input
                                    name="barkTexture"
                                    type="radio"
                                    value="Wavey"
                                    onClick={e => this.changeValue(e)}
                                />  Wavey<br></br>
                                <input
                                    name="barkTexture"
                                    type="radio"
                                    value="Scaly"
                                    onClick={e => this.changeValue(e)}
                                />  Scaly<br></br>
                                <input
                                    name="barkTexture"
                                    type="radio"
                                    value="Ribbed"
                                    onClick={e => this.changeValue(e)}
                                />  Ribbed<br></br>
                            </div>
                            <div class="barkColor text">
                                <p>Bark Color</p>
                                <input
                                    name="barkColor"
                                    type="text"
                                    value={this.state.barkColor}
                                    onChange={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="barkThickness">
                                <p>Bark Thickness</p>
                                <input
                                    name="barkThickness"
                                    type="radio"
                                    value="Thick"
                                    onClick={e => this.changeValue(e)}
                                />  Thick<br></br>
                                <input
                                    name="barkThickness"
                                    type="radio"
                                    value="Thin"
                                    onClick={e => this.changeValue(e)}
                                /> Thin <br></br>
                                <input
                                    name="barkThickness"
                                    type="radio"
                                    value="Moderate"
                                    onClick={e => this.changeValue(e)}
                                />  Moderate<br></br>
                            </div>
                            <div class="flowerColor text">
                                <p>Flower Color</p>
                                <input
                                    name="flowerColor"
                                    type="text"
                                    value={this.state.flowerColor}
                                    onChange={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="petalNumber text">
                                <p>Petal Number</p>
                                <input
                                    name="petalNumber"
                                    type="number"
                                    value={this.state.petalNumber}
                                    onChange={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="leafColor text">
                                <p>Leaf Color</p>
                                <input
                                    name="leafColor"
                                    type="text"
                                    value={this.state.leafColor}
                                    onChange={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="leafShape">
                                <p>Leaf Shape</p>
                                <input
                                    name="leafShape"
                                    type="radio"
                                    value="Oval"
                                    onClick={e => this.changeValue(e)}
                                />  Oval<br></br>
                                <input
                                    name="leafShape"
                                    type="radio"
                                    value="Truncate"
                                    onClick={e => this.changeValue(e)}
                                />  Truncate<br></br>
                                <input
                                    name="leafShape"
                                    type="radio"
                                    value="Elliptical"
                                    onClick={e => this.changeValue(e)}
                                />  Elliptical<br></br>
                                <input
                                    name="leafShape"
                                    type="radio"
                                    value="Lancolate"
                                    onClick={e => this.changeValue(e)}
                                />  Lancolate<br></br>
                                <input
                                    name="leafShape"
                                    type="radio"
                                    value="Linear"
                                    onClick={e => this.changeValue(e)}
                                />  Linear<br></br>
                            </div>
                            <div class="leafArrangement">
                                <p>Leaf Arrangement</p>
                                <input
                                    name="leafArrangement"
                                    type="radio"
                                    value="Whorled"
                                    onClick={e => this.changeValue(e)}
                                />  Whorled<br></br>
                                <input
                                    name="leafArrangement"
                                    type="radio"
                                    value="Alternate"
                                    onClick={e => this.changeValue(e)}
                                /> Alternate<br></br>
                                <input
                                    name="leafArrangement"
                                    type="radio"
                                    value="Opposite"
                                    onClick={e => this.changeValue(e)}
                                />  Opposite<br></br>
                                <input
                                    name="leafArrangement"
                                    type="radio"
                                    value="Spiral"
                                    onClick={e => this.changeValue(e)}
                                />  Spiral<br></br>
                            </div>
                            <div class="hasThorns">
                                <label>Has Thorns</label>
                                <input
                                    name="hasThorns"
                                    type="checkbox"
                                    onClick={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="fruitType">
                                <p>Fruit Type</p>
                                <input
                                    name="fruitType"
                                    type="radio"
                                    value="Nuts"
                                    onClick={e => this.changeValue(e)}
                                />  Nuts<br></br>
                                <input
                                    name="fruitType"
                                    type="radio"
                                    value="Legumes"
                                    onClick={e => this.changeValue(e)}
                                />  Legumes<br></br>
                                <input
                                    name="fruitType"
                                    type="radio"
                                    value="Pomes"
                                    onClick={e => this.changeValue(e)}
                                />  Pomes<br></br>
                                <input
                                    name="fruitType"
                                    type="radio"
                                    value="Berries"
                                    onClick={e => this.changeValue(e)}
                                />  Berries<br></br>
                                <input
                                    name="fruitType"
                                    type="radio"
                                    value="Big Fruit"
                                    onClick={e => this.changeValue(e)}
                                />  Big Fruit<br></br>
                            </div>
                            <div class="fruitColor text">
                                <p>Fruit Color</p>
                                <input
                                    name="fruitColor"
                                    type="text"
                                    value={this.state.fruitColor}
                                    onChange={e => this.changeValue(e)}
                                />
                            </div>
                            <div class="floweringSeason">
                                <p>Flowering Season </p>
                                <input
                                    name="floweringSeason"
                                    type="radio"
                                    value="Spring"
                                    onClick={e => this.changeValue(e)}
                                />  Spring<br></br>
                                <input
                                    name="floweringSeason"
                                    type="radio"
                                    value="Fall"
                                    onClick={e => this.changeValue(e)}
                                />  Fall<br></br>
                                <input
                                    name="floweringSeason"
                                    type="radio"
                                    value="Summer"
                                    onClick={e => this.changeValue(e)}
                                />  Summer<br></br>
                                <input
                                    name="floweringSeason"
                                    type="radio"
                                    value="Winter"
                                    onClick={e => this.changeValue(e)}
                                />  Winter<br></br>
                            </div>
                            
                        </form>
                    </div>
                    <div class="buttonContainer">
                        <button onClick={this.props.closePopup}>Cancel</button>
                        <button onClick={e => this.onSubmit(e)}>Submit</button>
                    </div>
                </div>
            </div>

        );
    }
}