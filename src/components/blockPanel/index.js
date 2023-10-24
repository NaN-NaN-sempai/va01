const imports = import.meta.glob('./*.svelte');

const loadModules = async () => {
    const components = {};

    for (const path in imports) {
        const name = path.split('/').pop().replace('.svelte', '');
        const imported = await imports[path]();
        const component = imported.default;

        components[name] = component;
    }

    return components;
}


export default await loadModules();