import { Character } from './types';

type Props = {
    elements: Character[];
};

const Grid = ({ elements }: Props) => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
        {elements.map(({ name, species, image }, index) => (
            <div className="grid-element" key={`grid-element-${index}`}>
                <div className="relative pb-2/3">
                    <img
                        className="absolute h-full w-full object-cover"
                        src={image}
                    />
                </div>
                <h3 className="font-bold">{name}</h3>
                <p>{species}</p>
            </div>
        ))}
    </div>
);

export default Grid;
