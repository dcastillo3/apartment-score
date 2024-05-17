#!/bin/bash

# Get component name and path from arguments
COMPONENT_NAME=$1
COMPONENT_PATH=$2

# Convert component name to lowercase for the directory name
COMPONENT_NAME_LOWER=$(echo "$COMPONENT_NAME" | awk '{print tolower($0)}')

# Define the component directory path
COMPONENT_DIR="./src/components/$COMPONENT_PATH/$COMPONENT_NAME_LOWER"

# Create the component directory
mkdir -p "$COMPONENT_DIR"

# Create the main component file template
cat > "$COMPONENT_DIR/${COMPONENT_NAME_LOWER}.js" <<EOF
import React from 'react';
import { useMediaQuery } from 'hooks';
import { ${COMPONENT_NAME^}Container } from './${COMPONENT_NAME_LOWER}StyledComponents';

function ${COMPONENT_NAME^}() {
    const { isDesktop } = useMediaQuery();
    const ${COMPONENT_NAME}ContainerPadding = isDesktop ? [5, 8] : [2];

    return (
        <${COMPONENT_NAME^}Container \$p={${COMPONENT_NAME}ContainerPadding}>
            ${COMPONENT_NAME^} component
        </${COMPONENT_NAME^}Container>
    );
};

export default ${COMPONENT_NAME^};
EOF

# Create an empty constants file
touch "$COMPONENT_DIR/${COMPONENT_NAME_LOWER}Consts.js"

# Create an empty utils file
touch "$COMPONENT_DIR/${COMPONENT_NAME_LOWER}Utils.js"

# Create the styled components file template
cat > "$COMPONENT_DIR/${COMPONENT_NAME_LOWER}StyledComponents.js" <<EOF
import styled from 'styled-components';
import { Box } from 'components/styled';

const ${COMPONENT_NAME^}Container = styled(Box)\`
\`;

export { 
    ${COMPONENT_NAME^}Container
};
EOF

# Create the index file if the COMPONENT_PATH is not common, if it is export the component in the common index file
if [ "$COMPONENT_PATH" != "common" ]; then
    cat > "$COMPONENT_DIR/index.js" <<EOF
export { default as ${COMPONENT_NAME^} } from './${COMPONENT_NAME_LOWER}';
EOF
else
    echo "export { default as ${COMPONENT_NAME^} } from './${COMPONENT_NAME_LOWER}/${COMPONENT_NAME_LOWER}';" >> "$COMPONENT_DIR/../index.js"
fi

# Print success message
echo "Component structure for ${COMPONENT_NAME} created successfully at ${COMPONENT_DIR}."
